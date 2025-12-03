// --- KONFIGURASI API ---
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx3vf1qTb5CcQ1Jxm83VUSGyusN8LyEnbx44Sx1NRGWkQyhEUFh_LjQXTDs3828498p/exec"; 
const MEMBERS = ["Abdul", "Adam", "Ade", "Adi", "Ali", "Andika", "M. Hisyam", "Naufal", "Rahmat", "Syaefulloh", "Yuda"];

const DEFAULT_CATS = {
    income: ['Iuran Bulanan', 'Uang Riset', 'Tambahan'], 
    expense: ['Belanja Pasar', 'Gas', 'Air Galon', 'Bumbu', 'Lain-lain']
};

const { useState, useEffect, useMemo } = React;

// --- ICONS (SVG) ---
const Icons = {
    Wallet: ({className}) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>,
    Plus: ({className}) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>,
    FileText: ({className}) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>,
    Users: ({className}) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>,
    Trash: ({className}) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>,
    Lock: ({className}) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>,
    LogOut: ({className}) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>,
    Chart: ({className}) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path></svg>,
    Refresh: ({className}) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
};

const formatRupiah = (n) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);
const formatDate = (d) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });

// --- COMPONENTS ---

const LoginScreen = ({ onLogin }) => {
    const [pass, setPass] = useState('');
    const handleAdmin = (e) => {
        e.preventDefault();
        if (pass === 'MulyosariKAV57A') onLogin('admin');
        else alert('Password Salah!');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="glass-card rounded-3xl p-10 w-full max-w-sm animate-fade-in text-center">
                <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                    <Icons.Wallet className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">Keuangan Dapur Pro</h1>
                <p className="text-slate-400 text-xs mb-8">ASRAMA MULYOSARI KAV 57A</p>
                <form onSubmit={handleAdmin} className="space-y-4">
                    <input type="password" placeholder="Password Admin..." className="w-full p-4 glass-input rounded-xl text-center" value={pass} onChange={(e) => setPass(e.target.value)} />
                    <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-500 transition-all uppercase text-xs tracking-widest">Masuk Admin</button>
                </form>
                <div className="mt-8 pt-8 border-t border-white/10">
                    <button onClick={() => onLogin('guest')} className="w-full py-3 border border-white/10 text-slate-300 font-bold rounded-xl hover:bg-white/5 transition-all text-sm flex items-center justify-center gap-2">
                        <Icons.Users className="w-4 h-4"/> Akses Tamu
                    </button>
                </div>
            </div>
        </div>
    );
};

const InputForm = ({ onAdd, categories, isLoading }) => {
    const [form, setForm] = useState({ type: 'expense', amount: '', category: '', desc: '', date: new Date().toISOString().split('T')[0], person: '', budgetType: 'regular' });
    
    const handleSubmit = (e) => { 
        e.preventDefault();
        if(!form.amount) return;
        onAdd({...form, amount: parseFloat(form.amount), person: form.type === 'income' ? form.person : '-', invoiceNo: '-'}); 
        setForm({...form, amount:'', desc:'', person:'', budgetType: 'regular'});
    };

    return (
        <div className="glass-card rounded-3xl p-8 mb-8">
            <h3 className="font-bold text-white mb-6 flex items-center gap-2 text-lg"><Icons.Plus className="w-5 h-5 text-indigo-400"/> Input Transaksi</h3>
            <div className="flex bg-slate-900/50 p-1 rounded-xl mb-6">
                <button onClick={() => setForm({...form, type: 'expense'})} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${form.type === 'expense' ? 'bg-rose-600 text-white' : 'text-slate-400'}`}>PENGELUARAN</button>
                <button onClick={() => setForm({...form, type: 'income'})} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${form.type === 'income' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}>PEMASUKAN</button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="text-[10px] text-slate-400 font-bold uppercase mb-1 block">Jenis Anggaran</label>
                        <select className="w-full p-3 glass-input rounded-xl text-sm [&>option]:text-black" value={form.budgetType} onChange={e => setForm({...form, budgetType: e.target.value})}>
                            <option value="regular">Harian (Regular)</option>
                            <option value="riset">Riset (Minggu)</option>
                        </select>
                    </div>
                     <div>
                        <label className="text-[10px] text-slate-400 font-bold uppercase mb-1 block">Tanggal</label>
                        <input type="date" required className="w-full p-3 glass-input rounded-xl text-sm" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-[10px] text-slate-400 font-bold uppercase mb-1 block">Kategori</label>
                        <select className="w-full p-3 glass-input rounded-xl text-sm [&>option]:text-black" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                            <option value="">Pilih...</option>
                            {(form.type === 'income' ? categories.income : categories.expense).map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    {form.type === 'income' && (
                        <div>
                            <label className="text-[10px] text-slate-400 font-bold uppercase mb-1 block">Nama</label>
                            <select className="w-full p-3 glass-input rounded-xl text-sm [&>option]:text-black" value={form.person} onChange={e => setForm({...form, person: e.target.value})}>
                                <option value="">Pilih Member...</option>
                                {MEMBERS.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                        </div>
                    )}
                </div>

                <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase mb-1 block">Nominal (Rp)</label>
                    <input type="number" required min="1" placeholder="0" className="w-full p-4 glass-input rounded-xl text-xl font-bold font-mono" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} />
                </div>

                <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase mb-1 block">Keterangan</label>
                    <input type="text" placeholder="Detail..." className="w-full p-3 glass-input rounded-xl text-sm" value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} />
                </div>

                <button disabled={isLoading} className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 transition-all uppercase text-xs tracking-widest disabled:opacity-50">
                    {isLoading ? 'Menyimpan...' : 'Simpan Transaksi'}
                </button>
            </form>
        </div>
    );
};

const MacroReportCard = ({ title, data, colorClass }) => {
    const costPerPerson = data.participantCount > 0 ? data.totalExpense / data.participantCount : 0;
    // Total Revenue now considers (Cash + Previous Balances that are being used)
    // Note: totalPreviousBalUsed can be negative if there were deficits carried over
    const effectiveRevenue = data.totalCash + data.totalPreviousBalUsed;
    const balance = effectiveRevenue - data.totalExpense;

    return (
        <div className={`glass-card rounded-3xl p-6 border-l-4 ${colorClass}`}>
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 flex justify-between items-center">
                {title}
                <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-white">{data.participantCount} Orang</span>
            </h4>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Total Kas Masuk</p>
                    <p className="text-lg font-bold text-white font-mono">{formatRupiah(data.totalCash)}</p>
                </div>
                <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Total Saldo Lalu</p>
                    <p className={`text-lg font-bold font-mono ${data.totalPreviousBalUsed >= 0 ? 'text-blue-400' : 'text-rose-400'}`}>
                        {formatRupiah(data.totalPreviousBalUsed)}
                    </p>
                </div>
                <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Total Pengeluaran</p>
                    <p className="text-lg font-bold text-rose-400 font-mono">{formatRupiah(data.totalExpense)}</p>
                </div>
                <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Sisa / Surplus</p>
                    <p className={`text-lg font-bold font-mono ${balance >= 0 ? 'text-emerald-400' : 'text-rose-500'}`}>{formatRupiah(balance)}</p>
                </div>
            </div>

            <div className="p-4 bg-slate-900/40 rounded-xl border border-white/5">
                <div className="flex justify-between items-end mb-1">
                    <span className="text-xs text-slate-400">Beban per Orang</span>
                    <span className="text-sm font-bold text-white font-mono">{formatRupiah(costPerPerson)}</span>
                </div>
                <div className="w-full h-px bg-white/10 my-2"></div>
                <p className="text-[10px] text-slate-500 italic leading-relaxed">
                    *Saldo/Defisit Lalu dihitung akumulatif per individu. Jika bulan lalu tidak ikut, saldo/defisit akan tersimpan dan muncul kembali saat aktif.
                </p>
            </div>
        </div>
    );
};

const DetailedTable = ({ title, members, periodData, type }) => {
    const costPerPerson = periodData.participantCount > 0 ? periodData.totalExpense / periodData.participantCount : 0;

    return (
        <div className="glass-card rounded-3xl p-6 overflow-hidden">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-4 flex items-center gap-2">
                <Icons.Chart className="w-4 h-4 text-indigo-400"/> {title} - Rincian Personal
            </h4>
            <div className="overflow-x-auto">
                <table className="w-full text-xs text-left print-border">
                    <thead className="bg-black/30 text-indigo-200 font-bold uppercase tracking-wider text-[10px]">
                        <tr>
                            <th className="p-3 rounded-tl-lg">Nama</th>
                            <th className="p-3 text-right text-emerald-300">Kas Masuk</th>
                            <th className="p-3 text-right text-blue-300">
                                Saldo Lalu<br/><span className="text-[8px] opacity-70">(Sisa/Defisit)</span>
                            </th>
                            <th className="p-3 text-right text-white bg-white/5">Total<br/>Kontribusi</th>
                            <th className="p-3 text-right text-rose-300">Beban<br/>Biaya</th>
                            <th className="p-3 text-right rounded-tr-lg">Saldo<br/>Akhir</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-300 font-mono">
                        {members.map(m => {
                            const cashIn = type === 'regular' ? m.cashRegular : m.cashRiset;
                            const prevBal = type === 'regular' ? m.prevBalRegular : m.prevBalRiset;
                            
                            // Total Contribution = Cash + Previous Balance (Subtracts if PrevBal is negative)
                            const totalContrib = cashIn + prevBal;
                            
                            const isActive = type === 'regular' ? m.isRegularParticipant : m.isRisetParticipant;
                            const expenseShare = isActive ? costPerPerson : 0;
                            
                            // Ending Balance
                            const endingBal = totalContrib - expenseShare;

                            // Hide rows if not active and no leftover money hanging around
                            if (!isActive && totalContrib === 0 && prevBal === 0) return null;
                            
                            // If inactive but has balance, show it (as it is carried over)
                            // But typically we focus on Active participants for the cost sharing
                            // The logic: if isActive is false, expenseShare is 0, so endingBal = totalContrib (just carry over)
                            
                            // However, typically reports show Active people. 
                            // If someone has money but is inactive, user might want to see them or not? 
                            // Let's show only if isActive OR if they paid something this month.
                            if (!isActive && cashIn === 0) return null;

                            return (
                                <tr key={m.name} className="hover:bg-white/5 transition-colors">
                                    <td className="p-3 font-sans font-bold text-white">{m.name}</td>
                                    <td className="p-3 text-right text-emerald-400">{formatRupiah(cashIn).replace('Rp','')}</td>
                                    <td className={`p-3 text-right ${prevBal >= 0 ? 'text-blue-400' : 'text-rose-400'}`}>
                                        {formatRupiah(prevBal).replace('Rp','')}
                                    </td>
                                    <td className="p-3 text-right font-bold text-white bg-white/5">{formatRupiah(totalContrib).replace('Rp','')}</td>
                                    <td className="p-3 text-right text-rose-400">{formatRupiah(expenseShare).replace('Rp','')}</td>
                                    <td className={`p-3 text-right font-bold ${endingBal >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                        {formatRupiah(endingBal).replace('Rp','')}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const TransactionHistory = ({ transactions, onDelete, isAdmin }) => {
    let runningBal = 0;
    const history = transactions.map(t => {
        const val = t.type === 'income' ? t.amount : -t.amount;
        runningBal += val;
        return { ...t, bal: runningBal };
    }).reverse();

    return (
        <div className="glass-card rounded-3xl p-6 mt-8">
             <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-4 flex items-center gap-2">
                <Icons.FileText className="w-4 h-4 text-indigo-400"/> Buku Kas Umum
            </h4>
            <div className="overflow-x-auto">
                <table className="w-full text-xs text-left print-border">
                    <thead className="bg-black/30 text-indigo-200 font-bold uppercase tracking-wider text-[10px]">
                        <tr>
                            <th className="p-3">Tanggal</th>
                            <th className="p-3">Uraian</th>
                            <th className="p-3 text-right text-emerald-400">Masuk</th>
                            <th className="p-3 text-right text-rose-400">Keluar</th>
                            {isAdmin && <th className="p-3 text-center no-print">Act</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono">
                        {history.map(t => (
                            <tr key={t.id} className="hover:bg-white/5">
                                <td className="p-3 text-slate-400 font-sans">{formatDate(t.date)}</td>
                                <td className="p-3 font-sans">
                                    <div className="font-bold text-slate-200">{t.category}</div>
                                    <div className="text-[10px] text-slate-500">{t.desc} {t.person !== '-' ? `(${t.person})` : ''} <span className="px-1.5 py-0.5 rounded bg-white/10 ml-2">{t.budgetType === 'riset' ? 'Riset' : 'Reg'}</span></div>
                                </td>
                                <td className="p-3 text-right text-emerald-400">{t.type==='income' ? formatRupiah(t.amount).replace('Rp','') : '-'}</td>
                                <td className="p-3 text-right text-rose-400">{t.type==='expense' ? formatRupiah(t.amount).replace('Rp','') : '-'}</td>
                                {isAdmin && (
                                    <td className="p-3 text-center no-print">
                                        <button onClick={() => alert("Hapus via Spreadsheet")} className="text-slate-600 hover:text-rose-500"><Icons.Trash className="w-4 h-4"/></button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const Reports = ({ allData, month, setMonth, isAdmin }) => {
    // --- HISTORICAL CALCULATIONS (LEDGER SYSTEM) ---
    
    // This function calculates balances for ALL members from the beginning of time
    // up to (but not including) the current selected month.
    const historicalBalances = useMemo(() => {
        const targetMonthStr = month; // e.g. "2023-11"
        
        // Get all unique months present in data, sorted ascending
        const availableMonths = [...new Set(allData.map(t => t.date.slice(0, 7)))].sort();
        
        // Initialize wallets
        let wallets = {
            reg: {},
            riset: {}
        };
        MEMBERS.forEach(m => { wallets.reg[m] = 0; wallets.riset[m] = 0; });

        // Iterate through months chronologically
        for (const mStr of availableMonths) {
            if (mStr >= targetMonthStr) break; // Stop before current month

            const txs = allData.filter(t => t.date.startsWith(mStr));

            // --- Regular Calculation for Month mStr ---
            const regIn = txs.filter(t => t.type === 'income' && t.budgetType !== 'riset');
            const regExp = txs.filter(t => t.type === 'expense' && t.budgetType !== 'riset').reduce((a,b)=>a+b.amount,0);
            // Who participated in mStr? (Paid Cash OR had Positive Balance used?)
            // Simplified: We usually check who Paid Cash. 
            // If someone relies purely on previous balance, they should ideally transaction '0' cash or be marked.
            // For now, let's assume 'Active' = Paid Cash > 0.
            const regActive = [...new Set(regIn.map(t => t.person).filter(p => p && p !== '-'))];
            
            if (regActive.length > 0) {
                // Calculate Total Available for Costing (Cash + Previous Balances of ACTIVE people)
                // Note: If someone active has a Negative Balance, it reduces the total pot (Defisit dibayar bersama? No, usually deficit reduces that person's buying power)
                // Wait, Standard logic: Cost = Total Expense / Active People.
                // Person End Bal = (PrevBal + CashIn) - Cost.
                
                const costPerPerson = regExp / regActive.length;

                MEMBERS.forEach(member => {
                    if (regActive.includes(member)) {
                        const cash = regIn.filter(t => t.person === member).reduce((a,b)=>a+b.amount,0);
                        const prev = wallets.reg[member] || 0;
                        wallets.reg[member] = (prev + cash) - costPerPerson;
                    } else {
                        // If not active, balance stays dormant (unchanged)
                        // wallets.reg[member] remains same
                    }
                });
            }

            // --- Riset Calculation for Month mStr ---
            const risetIn = txs.filter(t => t.type === 'income' && t.budgetType === 'riset');
            const risetExp = txs.filter(t => t.type === 'expense' && t.budgetType === 'riset').reduce((a,b)=>a+b.amount,0);
            const risetActive = [...new Set(risetIn.map(t => t.person).filter(p => p && p !== '-'))];

            if (risetActive.length > 0) {
                const costPerPerson = risetExp / risetActive.length;
                MEMBERS.forEach(member => {
                    if (risetActive.includes(member)) {
                        const cash = risetIn.filter(t => t.person === member).reduce((a,b)=>a+b.amount,0);
                        const prev = wallets.riset[member] || 0;
                        wallets.riset[member] = (prev + cash) - costPerPerson;
                    }
                });
            }
        }
        return wallets;
    }, [allData, month]);

    // --- CURRENT MONTH CALCULATION ---
    const currTxs = allData.filter(t => t.date.startsWith(month));
    
    // Calculate Current Stats purely based on expenses
    const currExpenses = {
        reg: currTxs.filter(t => t.type === 'expense' && t.budgetType !== 'riset').reduce((a,b)=>a+b.amount,0),
        riset: currTxs.filter(t => t.type === 'expense' && t.budgetType === 'riset').reduce((a,b)=>a+b.amount,0)
    };

    const memberDetails = useMemo(() => {
        return MEMBERS.map(name => {
            // Current Cash In
            const cashRegular = currTxs.filter(t => t.type==='income' && t.budgetType!=='riset' && t.person===name).reduce((a,b)=>a+b.amount,0);
            const cashRiset = currTxs.filter(t => t.type==='income' && t.budgetType==='riset' && t.person===name).reduce((a,b)=>a+b.amount,0);

            // Active Status
            const isRegularParticipant = cashRegular > 0;
            const isRisetParticipant = cashRiset > 0;

            // Retrieve Historical Balance (This solves the Andika skipping month issue)
            // If isRegularParticipant is true, we pull the balance.
            // Even if negative, we pull it.
            const prevBalRegular = isRegularParticipant ? (historicalBalances.reg[name] || 0) : 0;
            const prevBalRiset = isRisetParticipant ? (historicalBalances.riset[name] || 0) : 0;

            return { name, cashRegular, prevBalRegular, isRegularParticipant, cashRiset, prevBalRiset, isRisetParticipant };
        });
    }, [currTxs, historicalBalances]);

    // Macro Summaries
    const regularMacro = useMemo(() => {
        const active = memberDetails.filter(m => m.isRegularParticipant);
        const totalCash = active.reduce((a,b)=>a+b.cashRegular,0);
        const totalPreviousBalUsed = active.reduce((a,b)=>a+b.prevBalRegular,0);
        
        return {
            participantCount: active.length,
            totalCash,
            totalPreviousBalUsed,
            totalExpense: currExpenses.reg
        };
    }, [memberDetails, currExpenses]);

    const risetMacro = useMemo(() => {
        const active = memberDetails.filter(m => m.isRisetParticipant);
        const totalCash = active.reduce((a,b)=>a+b.cashRiset,0);
        const totalPreviousBalUsed = active.reduce((a,b)=>a+b.prevBalRiset,0);

        return {
            participantCount: active.length,
            totalCash,
            totalPreviousBalUsed,
            totalExpense: currExpenses.riset
        };
    }, [memberDetails, currExpenses]);

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            <div className="glass-card rounded-2xl p-4 flex flex-col md:flex-row justify-between items-center no-print gap-4">
                <h3 className="font-bold text-white flex items-center gap-3 text-lg px-2">Laporan & Analisa</h3>
                <div className="flex items-center bg-slate-900/50 p-1.5 rounded-xl border border-white/10">
                    <input type="month" className="bg-transparent border-none text-white font-bold p-2 text-sm outline-none [&::-webkit-calendar-picker-indicator]:invert" value={month} onChange={e => setMonth(e.target.value)} />
                    <button onClick={() => window.print()} className="ml-4 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors">Print PDF</button>
                </div>
            </div>

            <div className="print-header hidden print:block text-center mb-6">
                <h1 className="text-2xl font-bold uppercase border-b-2 border-black pb-2">Laporan Dapur Asrama</h1>
                <p className="mt-2">Periode: {month}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MacroReportCard title="Iuran Harian (Regular)" data={regularMacro} colorClass="border-emerald-500" />
                <MacroReportCard title="Iuran Mingguan (Riset)" data={risetMacro} colorClass="border-purple-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <DetailedTable title="Regular" members={memberDetails} periodData={regularMacro} type="regular" />
                <DetailedTable title="Riset" members={memberDetails} periodData={risetMacro} type="riset" />
            </div>

            <TransactionHistory transactions={currTxs} isAdmin={isAdmin} />
        </div>
    );
};

const App = () => {
    const [role, setRole] = useState(null);
    const [tab, setTab] = useState('report');
    const [notification, setNotification] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().slice(0, 7));
    
    const [data, setData] = useState(() => {
        try { return JSON.parse(localStorage.getItem('transaksi_dapur_pro')) || []; } catch { return []; }
    });

    const fetchData = async () => {
        try {
            const res = await fetch(GOOGLE_SCRIPT_URL);
            const json = await res.json();
            if(json.status === 'success') {
                setData(json.data);
                localStorage.setItem('transaksi_dapur_pro', JSON.stringify(json.data));
            }
        } catch(e) { console.error("Offline/Error", e); }
    };

    useEffect(() => { fetchData(); const i = setInterval(fetchData, 10000); return () => clearInterval(i); }, []);

    const addTrans = async (d) => {
        setIsLoading(true);
        try {
            await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: JSON.stringify(d) });
            setNotification("Data Tersimpan!");
            fetchData();
        } catch(e) { setNotification("Gagal simpan (Offline?)"); }
        finally { setIsLoading(false); setTimeout(() => setNotification(null), 3000); }
    };

    if (!role) return <LoginScreen onLogin={(r) => { setRole(r); setTab(r === 'admin' ? 'input' : 'report'); }} />;

    return (
        <div className="min-h-screen pb-12 w-full">
            {notification && <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-6 py-3 rounded-full shadow-lg z-50 text-xs font-bold animate-fade-in">{notification}</div>}
            
            <div className="max-w-7xl mx-auto p-4 lg:p-8">
                <div className="flex justify-between items-center mb-8 glass-card p-4 rounded-2xl no-print">
                    <h1 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className="bg-indigo-600 p-1.5 rounded-lg"><Icons.Wallet className="w-5 h-5"/></span> Keuangan Dapur <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-indigo-200">PRO</span>
                    </h1>
                    <div className="flex gap-2">
                        {role === 'admin' && <button onClick={() => setTab('input')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${tab==='input'?'bg-indigo-600 text-white':'text-slate-400 hover:bg-white/5'}`}>Input</button>}
                        <button onClick={() => setTab('report')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${tab==='report'?'bg-indigo-600 text-white':'text-slate-400 hover:bg-white/5'}`}>Laporan</button>
                        <button onClick={() => setRole(null)} className="p-2 rounded-xl text-slate-400 hover:bg-rose-500/20 hover:text-rose-400"><Icons.LogOut className="w-4 h-4"/></button>
                    </div>
                </div>

                {tab === 'input' && role === 'admin' && <div className="max-w-2xl mx-auto"><InputForm onAdd={addTrans} categories={DEFAULT_CATS} isLoading={isLoading} /></div>}
                
                {(tab === 'report' || role === 'guest') && (
                    <Reports allData={data} month={currentMonth} setMonth={setCurrentMonth} isAdmin={role === 'admin'} />
                )}
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
