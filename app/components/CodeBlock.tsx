import React, { useState, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// ✅ แก้ไขการ import ที่บรรทัดนี้
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';

// ไอคอนที่เราจะใช้ (SVG)
const CopyIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
);

const CheckIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

interface CodeBlockProps {
    code: string;
    language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
    const [isCopied, setIsCopied] = useState(false);
    
    const handleCopy = () => {
        navigator.clipboard.writeText(code)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    };

    return (
        <div className="bg-slate-900 rounded-xl my-4 overflow-hidden shadow-lg border border-slate-700/50">
            <div className="flex justify-between items-center px-4 py-2 bg-slate-800/50 border-b border-slate-700/50">
                <span className="text-xs font-sans text-slate-400 uppercase">
                    {language || 'Code'}
                </span>
                
                <button
                    onClick={handleCopy}
                    className={`relative flex items-center justify-center p-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${
                        isCopied 
                            ? 'bg-green-600/20 text-green-400' 
                            : 'bg-slate-700/50 hover:bg-slate-600/50 text-slate-400 hover:text-slate-200'
                    }`}
                    aria-label="Copy code"
                >
                    <span className={`transition-transform duration-200 ease-in-out ${isCopied ? 'scale-0' : 'scale-100'}`}>
                        <CopyIcon />
                    </span>
                    <span className={`absolute transition-transform duration-200 ease-in-out ${isCopied ? 'scale-100' : 'scale-0'}`}>
                        <CheckIcon />
                    </span>
                </button>
            </div>
            
            <div className="text-sm font-mono overflow-x-auto">
                <SyntaxHighlighter 
                    language={language || 'plaintext'}
                    style={vscDarkPlus}
                    customStyle={{ 
                        margin: 0, 
                        padding: '1rem', 
                        backgroundColor: 'transparent' 
                    }}
                    wrapLongLines={true}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export default CodeBlock;