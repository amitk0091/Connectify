// ConfirmationOverlay.js
import React from 'react';
import { motion } from 'framer-motion';
import { IoMdLogOut } from 'react-icons/io';

const ConfirmationOverlay = ({ message, onConfirm, onCancel }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50"
    >
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <p className="text-lg mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            className="text-red-500 mr-4 hover:text-red-700"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ConfirmationOverlay;
