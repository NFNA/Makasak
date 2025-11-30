/* Base Styles */
body { 
    font-family: 'Plus Jakarta Sans', sans-serif; 
    background-color: #0f172a; 
    color: #e2e8f0;
    overflow-x: hidden;
    font-size: 14px;
}

/* Background Gradient & Effects */
.bg-fixed-gradient {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: radial-gradient(circle at top right, #1e1b4b, #0f172a);
    z-index: -10;
}

.deco-blob {
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    z-index: -5;
    opacity: 0.3;
}
.blob-1 { top: -10%; right: -10%; width: 600px; height: 600px; background: #4f46e5; }
.blob-2 { bottom: -10%; left: -10%; width: 500px; height: 500px; background: #ec4899; }

/* Glassmorphism Utilities */
.glass-card {
    background: rgba(30, 41, 59, 0.75);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
}

.glass-input {
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
    transition: all 0.2s;
}
.glass-input:focus {
    border-color: #6366f1;
    background: rgba(15, 23, 42, 0.8);
    outline: none;
}

/* Scrollbar Styling */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }

/* Print Media Queries */
@media print {
    .no-print { display: none !important; }
    
    body, html { 
        background-color: white !important; 
        background-image: none !important;
        color: black !important; 
        width: 100%;
        margin: 0;
        padding: 0;
    }
    
    .bg-fixed-gradient, .deco-blob, #bg-music { display: none !important; }
    
    .glass-card { 
        background: white !important; 
        box-shadow: none !important; 
        border: none !important; 
        color: black !important; 
        backdrop-filter: none !important;
        padding: 0 !important;
        margin-bottom: 20px !important;
    }

    .text-slate-400, .text-indigo-200, .text-indigo-300, .text-gray-500 { color: #333 !important; }
    .text-white { color: #000 !important; }
    .text-emerald-400, .text-green-600 { color: #000 !important; font-weight: bold; } 
    .text-rose-400, .text-red-600 { color: #000 !important; } 

    .print-border { border: 1px solid #000 !important; border-collapse: collapse !important; width: 100%; }
    .print-border th, .print-border td { border: 1px solid #000 !important; padding: 4px 8px !important; }
    .print-header { display: block !important; text-align: center; margin-bottom: 20px; border-bottom: 2px solid black; padding-bottom: 10px; }
    
    thead, tbody, tr, td, th { background: transparent !important; }
    
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
}
.print-header { display: none; }
