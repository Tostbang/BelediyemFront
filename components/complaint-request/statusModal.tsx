'use client';

import React, { useActionState, useState } from 'react';
import Modal from '../common/modal';
import SubmitButton from '../common/submitButton';
import {
    updateComplaintStatusMuni,
    updateCompletedComplaintStatusMuni,
} from '@/app/actions/municipality/complaints';
import { RoleType } from '@/types';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import { useRouter } from 'next/navigation';
import { complaintStatusType } from '@/data/complaintStatus';
import ImageUploader from '../dynamic/imageUploader';

type MessageModalProps = {
    isOpen: boolean;
    onClose: () => void;
    id: string;
    type: RoleType;
};

export default function StatusModal({
    isOpen,
    onClose,
    id,
    type,
}: MessageModalProps) {
    const { handleSuccess, handleError } = useNotificationHandler();
    const router = useRouter();

    // Add state to track current selection
    const [selectedStatusType, setSelectedStatusType] = useState<number>(0);

    const initialState = {
        description: '',
        image: '',
        complaintStatus: false,
        complaintsStatusType: 0,
    };

    const handleCancel = () => {
        onClose();
    };

    const clientAction = async (_prevState: unknown, formData: FormData) => {
        if (id) {
            formData.append('id', id);
        }

        const statusId = selectedStatusType;
        let result;

        if (statusId <= 3) {
            formData.append('complaintsStatusType', statusId.toString());

            if (type === 'municipality') {
                result = await updateComplaintStatusMuni(formData);
            } else if (type === 'admin') {
                result = await updateComplaintStatusMuni(formData);
            } else {
                result = {
                    success: false,
                    message: 'Unsupported role type',
                };
            }
        } else {
            const complaintStatus = statusId === 4 ? 'true' : 'false';
            formData.append('complaintStatus', complaintStatus);

            const description = formData.get('description') as string;
            formData.append('description', description);

            if (type === 'municipality') {
                result = await updateCompletedComplaintStatusMuni(formData);
            } else if (type === 'admin') {
                result = await updateCompletedComplaintStatusMuni(formData);
            } else {
                result = {
                    success: false,
                    message: 'Unsupported role type',
                };
            }
        }

        if (result.success) {
            handleSuccess(result.message);
            handleCancel();
            router.refresh();
        } else {
            handleError(result);
            handleCancel();
        }

        return {
            ...result,
            description: formData.get('description') as string,
            image: formData.get('image') as string,
            complaintsStatusType: Number(formData.get('complaintsStatusType')),
            complaintStatus: statusId === 4 ? true : false,
        };
    };

    const [state, formAction] = useActionState(clientAction, initialState);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="space-y-4">
                <form action={formAction}>
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="department"
                                className="block text-sm font-medium text-gray-700 mb-1">
                                Durum Seçin
                            </label>
                            <select
                                key={`complaintsStatusType-select-${state?.complaintsStatusType || 'default'}`}
                                id="complaintsStatusType"
                                name="complaintsStatusType"
                                defaultValue={state?.complaintsStatusType}
                                onChange={(e) =>
                                    setSelectedStatusType(
                                        Number(e.target.value)
                                    )
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required>
                                <option value="">Durum Seçin</option>
                                {complaintStatusType.map((dept) => (
                                    <option
                                        key={dept.id}
                                        value={dept.id.toString()}>
                                        {dept.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {selectedStatusType > 3 && (
                            <>
                                <div>
                                    <ImageUploader
                                        name="image"
                                        label="Görsel"
                                        targetWidth={1920}
                                        targetHeight={1080}
                                        required
                                    />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                        Açıklama
                                    </h3>
                                    <div>
                                        <textarea
                                            rows={3}
                                            id="reply-text"
                                            name="description"
                                            required
                                            className="w-full rounded-md border border-gray-300 p-2 min-h-32 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            placeholder="Mesajınızı buraya yazın..."
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="flex justify-end gap-2 mt-2">
                        <button
                            type="button"
                            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            onClick={handleCancel}>
                            İptal
                        </button>
                        <SubmitButton title="Gönder" />
                    </div>
                </form>
            </div>
        </Modal>
    );
}
