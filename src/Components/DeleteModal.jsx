function DeleteModal({ close, onConfirm, taskTitle }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl border border-slate-100 text-center">
        {/* Icon */}
        <div className="mx-auto mb-5 w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
          <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-slate-900 mb-2">Delete Task?</h2>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          Are you sure you want to delete <span className="font-semibold text-slate-700">"{taskTitle}"</span>? This action cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={close}
            className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-red-500 py-3 text-sm font-semibold text-white hover:bg-red-600 shadow-lg shadow-red-200 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;