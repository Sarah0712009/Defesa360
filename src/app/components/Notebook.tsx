import { useState } from 'react';
import { StickyNote, Plus, Trash2, Save } from 'lucide-react';
import { motion } from 'motion/react';

interface Note {
  id: string;
  title: string;
  content: string;
  caseNumber: string;
  timestamp: Date;
}

export function Notebook() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Reunião com Cliente - João Silva',
      content: 'Cliente confirma álibi. Testemunhas: Maria (vizinha) e Pedro (colega de trabalho). Verificar CCTV do local.',
      caseNumber: '001234-56.2024',
      timestamp: new Date('2026-05-18'),
    },
    {
      id: '2',
      title: 'Jurisprudência Relevante',
      content: 'STJ - REsp 1.234.567: Importante precedente sobre excludente de ilicitude. Aplicável ao caso Martinez.',
      caseNumber: '002345-67.2024',
      timestamp: new Date('2026-05-17'),
    },
  ]);

  const [selectedNote, setSelectedNote] = useState<Note | null>(notes[0]);
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveNote = () => {
    setIsEditing(false);
    // Save logic here
  };

  const handleAddNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Nova Anotação',
      content: '',
      caseNumber: '',
      timestamp: new Date(),
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
    setIsEditing(true);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
    if (selectedNote?.id === id) {
      setSelectedNote(notes[0] || null);
    }
  };

  return (
    <div className="h-full grid grid-cols-3 gap-4">
      {/* Notes List */}
      <div className="col-span-1 rounded-2xl backdrop-blur-md border border-border/50 p-4 overflow-y-auto" style={{ background: 'var(--card)' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground flex items-center gap-2">
            <StickyNote className="w-5 h-5 text-primary" />
            Anotações
          </h3>
          <button
            onClick={handleAddNote}
            className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2">
          {notes.map((note) => (
            <motion.button
              key={note.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedNote(note)}
              className={`
                w-full text-left p-3 rounded-lg border transition-all duration-200
                ${selectedNote?.id === note.id
                  ? 'bg-primary/10 border-primary/30'
                  : 'bg-muted/20 border-border/30 hover:border-primary/20'
                }
              `}
            >
              <h4 className="text-sm text-foreground mb-1 line-clamp-1">{note.title}</h4>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{note.content}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{note.caseNumber}</span>
                <span className="text-xs text-muted-foreground">
                  {note.timestamp.toLocaleDateString('pt-BR')}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Note Editor */}
      <div className="col-span-2 rounded-2xl backdrop-blur-md border border-border/50 p-6 flex flex-col" style={{ background: 'var(--card)' }}>
        {selectedNote ? (
          <>
            <div className="flex items-center justify-between mb-4">
              <input
                type="text"
                value={selectedNote.title}
                onChange={(e) => setSelectedNote({ ...selectedNote, title: e.target.value })}
                disabled={!isEditing}
                className="flex-1 text-xl text-foreground bg-transparent border-none outline-none disabled:opacity-70"
                placeholder="Título da anotação"
              />

              <div className="flex items-center gap-2">
                {isEditing ? (
                  <button
                    onClick={handleSaveNote}
                    className="px-4 py-2 rounded-lg bg-gradient-to-br from-primary to-accent text-white flex items-center gap-2 hover:shadow-lg hover:shadow-primary/30 transition-all duration-200"
                  >
                    <Save className="w-4 h-4" />
                    Salvar
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 rounded-lg bg-muted/30 text-foreground hover:bg-muted/50 transition-colors duration-200"
                  >
                    Editar
                  </button>
                )}

                <button
                  onClick={() => handleDeleteNote(selectedNote.id)}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mb-4">
              <input
                type="text"
                value={selectedNote.caseNumber}
                onChange={(e) => setSelectedNote({ ...selectedNote, caseNumber: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 rounded-lg bg-muted/20 border border-border/30 text-sm text-foreground placeholder:text-muted-foreground disabled:opacity-70"
                placeholder="Número do processo"
              />
            </div>

            <textarea
              value={selectedNote.content}
              onChange={(e) => setSelectedNote({ ...selectedNote, content: e.target.value })}
              disabled={!isEditing}
              className="flex-1 p-4 rounded-lg bg-muted/20 border border-border/30 text-foreground placeholder:text-muted-foreground resize-none disabled:opacity-70"
              placeholder="Digite suas anotações aqui..."
            />

            <div className="mt-4 text-xs text-muted-foreground">
              Última edição: {selectedNote.timestamp.toLocaleString('pt-BR')}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <StickyNote className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Selecione uma anotação ou crie uma nova</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
