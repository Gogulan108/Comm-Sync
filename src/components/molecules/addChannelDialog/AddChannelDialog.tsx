import React from 'react';
import { useForm } from 'react-hook-form';
import InputFeild from '../../atoms/inputFeild/InputFeild';
import Button from '../../atoms/button/Button';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-toastify';
import { useCreateChannel } from '../../../api/hooks/useCrateChannel';
import { queryClient } from '../../../main';

type AddChannelDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; description: string; isPrivate: boolean }) => void;
};

const AddChannelDialog: React.FC<AddChannelDialogProps> = ({ open, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ name: string; description: string; isPrivate: boolean }>({
    mode: 'onChange',
    defaultValues: { isPrivate: false },
  });
  const { user } = useAuth();
  const { mutate: createChannel, isPending } = useCreateChannel();

  const handleFormSubmit = (data: { name: string; description: string; isPrivate: boolean }) => {
    if (!user?.uid) return;
    createChannel(
      {
        name: data.name,
        description: data.description,
        isPrivate: data.isPrivate,
        createdBy: user.uid,
        members: [],
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['all-channels'] });
          toast.success('Channel Created successfully');
          onSubmit(data);
          reset();
          onClose();
        },
        onError: (error) => {
          toast.error('Failed to create channel');
          console.error('Failed to create channel:', error);
        },
      }
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80">
        <div className="font-bold text-lg mb-4">Add Channel</div>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mb-3">
            <InputFeild
              label="Name"
              placeholder="Channel name"
              {...register('name', {
                required: 'Name is required',
                maxLength: { value: 20, message: 'Name must be at most 20 characters' },
              })}
            />
            {errors.name && <div className="text-xs text-red-500">{errors.name.message}</div>}
          </div>
          <div className="mb-3">
            <InputFeild
              label="Description"
              type="textarea"
              placeholder="Channel description"
              {...register('description', { required: 'Description is required' })}
            />
            {errors.description && (
              <div className="text-xs text-red-500">{errors.description.message}</div>
            )}
          </div>
          <div className="mb-3 flex items-center">
            <input id="private" type="checkbox" {...register('isPrivate')} className="mr-2" />
            <label htmlFor="private" className="text-sm">
              is this Private Channel
            </label>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              className="bg-gray-200 text-gray-700"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              isLoading={isPending}
              type="submit"
              className="bg-blue-500 text-white w-30"
              disabled={isPending}
            >
              Add
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddChannelDialog;
