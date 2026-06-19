import { useState } from "react";

function TaskCard({ task, onDelete, onToggleComplete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSave = () => {
    onEdit(task.id, { title, description });
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      {isEditing ? (
        <div className="flex flex-col gap-3">
          <input 
            className="w-full border rounded-lg p-2 text-sm" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
          />
          <textarea 
            className="w-full border rounded-lg p-2 text-sm" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
          <button 
            onClick={handleSave}
            className="bg-violet-600 text-white py-2 rounded-lg text-sm font-semibold"
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          <h3 className="font-bold text-slate-900">{task.title}</h3>
          <p className="text-slate-500 text-sm mt-1">{task.description}</p>
          
          <div className="flex gap-3 mt-4">
            <button onClick={() => setIsEditing(true)} className="text-violet-600 text-xs font-bold">Edit</button>
            <button onClick={() => onDelete(task.id)} className="text-red-500 text-xs font-bold">Delete</button>
            <button onClick={() => onToggleComplete(task.id)} className="text-slate-400 text-xs font-bold">Done</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskCard;