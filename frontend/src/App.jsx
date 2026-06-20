import { useState, useEffect } from 'react';
import { Package, Activity, Plus, RefreshCw, XCircle, Terminal, CheckCircle2 } from 'lucide-react';
import './App.css';

function App() {
  const [pedidos, setPedidos] = useState([
    { id: '1001', clienteId: 'C-554', itens: ['Notebook'], status: 'PROCESSADO', valor: 3500 },
    { id: '1002', clienteId: 'C-223', itens: ['Mouse', 'Teclado'], status: 'PENDENTE', valor: 450 }
  ]);
  const [logs, setLogs] = useState([
    { time: new Date().toLocaleTimeString(), msg: "Sistema inicializado", type: "info" }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [novoPedidoItem, setNovoPedidoItem] = useState('');

  const addLog = (msg, type = "info") => {
    setLogs(prev => [{ time: new Date().toLocaleTimeString(), msg, type }, ...prev]);
  };

  const criarPedido = (e) => {
    e.preventDefault();
    if (!novoPedidoItem) return;

    const novoId = Math.floor(Math.random() * 10000).toString();
    const pedido = {
      id: novoId,
      clienteId: `C-${Math.floor(Math.random() * 999)}`,
      itens: [novoPedidoItem],
      status: 'PENDENTE',
      valor: Math.floor(Math.random() * 500) + 100
    };

    setPedidos([pedido, ...pedidos]);
    setIsModalOpen(false);
    setNovoPedidoItem('');

    addLog(`[API] Pedido ${novoId} recebido.`, "info");
    
    // Simula a Lambda processando
    setTimeout(() => {
      addLog(`[SQS] Evento recebido pela fila.`, "warning");
      setTimeout(() => {
        addLog(`[Lambda: processapedidos] Validando e salvando no DB...`, "success");
        setPedidos(current => current.map(p => p.id === novoId ? { ...p, status: 'PROCESSADO' } : p));
      }, 1500);
    }, 1000);
  };

  const alterarPedido = (id) => {
    addLog(`[API] Solicitada alteração no pedido ${id}.`, "info");
    
    setTimeout(() => {
      addLog(`[Lambda: alterapedido] Atualizando itens e status para ALTERADO.`, "success");
      setPedidos(current => current.map(p => p.id === id ? { ...p, status: 'ALTERADO' } : p));
    }, 1500);
  };

  const cancelarPedido = (id) => {
    addLog(`[API] Cancelamento do pedido ${id}.`, "info");
    
    setTimeout(() => {
      addLog(`[Lambda: cancelapedido] Pedido ${id} marcado como CANCELADO no banco.`, "danger");
      setPedidos(current => current.map(p => p.id === id ? { ...p, status: 'CANCELADO' } : p));
    }, 1500);
  };

  return (
    <div className="app-container">
      {/* Sidebar de Eventos (Console Mock) */}
      <aside className="glass-panel sidebar">
        <h2 className="title-glow" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '1.2rem' }}>
          <Terminal size={20} /> Console AWS (Simulado)
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', overflowY: 'auto' }}>
          {logs.map((log, idx) => (
            <div key={idx} className="animate-fade-in" style={{ fontSize: '0.85rem', padding: '0.75rem', background: 'rgba(0,0,0,0.4)', borderRadius: '6px', borderLeft: `3px solid ${log.type === 'success' ? 'var(--success-color)' : log.type === 'danger' ? 'var(--danger-color)' : log.type === 'warning' ? 'var(--warning-color)' : 'var(--primary-color)'}` }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>[{log.time}]</span>
              <p style={{ marginTop: '0.25rem' }}>{log.msg}</p>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 className="title-glow" style={{ fontSize: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Activity size={36} color="var(--primary-color)" /> Serverless Orders
            </h1>
            <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Monitoramento visual de processamento de pedidos (Portfolio)</p>
          </div>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={20} /> Novo Pedido
          </button>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {pedidos.map(pedido => (
            <div key={pedido.id} className="glass-panel animate-fade-in" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Package size={18} /> Pedido #{pedido.id}
                  </h3>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Cliente: {pedido.clienteId}</span>
                </div>
                <span className={`status-badge status-${pedido.status}`}>{pedido.status}</span>
              </div>
              
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '6px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>Itens</span>
                <p>{pedido.itens.join(', ')}</p>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', paddingTop: '1rem' }}>
                <button 
                  className="btn" 
                  style={{ flex: 1, padding: '0.5rem', background: 'rgba(255,255,255,0.05)', fontSize: '0.85rem' }}
                  onClick={() => alterarPedido(pedido.id)}
                  disabled={pedido.status === 'CANCELADO'}
                >
                  <RefreshCw size={14} /> Alterar
                </button>
                <button 
                  className="btn btn-danger" 
                  style={{ flex: 1, padding: '0.5rem', fontSize: '0.85rem' }}
                  onClick={() => cancelarPedido(pedido.id)}
                  disabled={pedido.status === 'CANCELADO'}
                >
                  <XCircle size={14} /> Cancelar
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal Criar Pedido */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div className="glass-panel animate-fade-in" style={{ width: '400px', padding: '2rem' }}>
            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={24} color="var(--primary-color)" /> Criar Novo Pedido
            </h2>
            <form onSubmit={criarPedido}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Nome do Item</label>
                <input 
                  type="text" 
                  value={novoPedidoItem}
                  onChange={(e) => setNovoPedidoItem(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--panel-border)', borderRadius: '8px', color: 'white', outline: 'none' }}
                  placeholder="Ex: Monitor 24 polegadas"
                  autoFocus
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn" style={{ background: 'transparent' }} onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Simular Envio</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
