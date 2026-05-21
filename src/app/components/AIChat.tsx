import { useState } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Olá! Sou seu assistente jurídico com IA. Como posso ajudar com seus casos hoje?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Analisando sua solicitação... Com base na jurisprudência recente e nas leis aplicáveis, sugiro considerar os seguintes pontos para sua defesa...',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full rounded-2xl backdrop-blur-md border border-border/50 overflow-hidden" style={{ background: 'var(--card)' }}>
      {/* Header */}
      <div className="p-4 border-b border-border/50 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-foreground flex items-center gap-2">
              Assistente Jurídico IA
              <Sparkles className="w-4 h-4 text-primary" />
            </h3>
            <p className="text-xs text-muted-foreground">Online e pronto para ajudar</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                ${message.role === 'assistant'
                  ? 'bg-gradient-to-br from-primary to-accent'
                  : 'bg-muted'
                }
              `}>
                {message.role === 'assistant' ? (
                  <Bot className="w-4 h-4 text-white" />
                ) : (
                  <User className="w-4 h-4 text-foreground" />
                )}
              </div>

              <div className={`
                flex-1 max-w-[80%] p-3 rounded-2xl
                ${message.role === 'assistant'
                  ? 'bg-muted/50 border border-border/30'
                  : 'bg-gradient-to-br from-primary to-accent text-white'
                }
              `}>
                <p className="text-sm">{message.content}</p>
                <p className={`text-xs mt-1 ${message.role === 'assistant' ? 'text-muted-foreground' : 'text-white/70'}`}>
                  {message.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border/50">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Digite sua pergunta jurídica..."
            className="flex-1 px-4 py-2 rounded-lg bg-input border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button
            onClick={handleSend}
            className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent text-white hover:shadow-lg hover:shadow-primary/30 transition-all duration-200"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
