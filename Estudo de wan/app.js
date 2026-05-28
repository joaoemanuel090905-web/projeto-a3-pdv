// =============================================
//  DENDÊ & SABOR — app.js
//  Lógica principal do PDV
// =============================================

// ─── UTILIDADES ────────────────────────────

function moeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function mostrarToast(msg, tipo = '') {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.className = 'toast ' + tipo;
    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => { el.className = 'toast hidden'; }, 2800);
}

function fecharModal(id) {
    document.getElementById(id).classList.add('hidden');
}

// ─── RELÓGIO ───────────────────────────────

function atualizarHora() {
    const el = document.getElementById('header-hora');
    if (!el) return;
    const agora = new Date();
    el.textContent = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}
setInterval(atualizarHora, 1000);
atualizarHora();

// ─── LOGIN ─────────────────────────────────

document.getElementById('login-senha').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') fazerLogin();
});

function fazerLogin() {
    const codigo = document.getElementById('login-codigo').value.trim();
    const senha = document.getElementById('login-senha').value.trim();
    const erro = document.getElementById('login-erro');
    const btn = document.getElementById('btn-entrar');

    const op = OPERADORES.find(o => o.codigo === codigo && o.senha === senha);

    if (!op) {
        erro.classList.remove('hidden');
        document.getElementById('login-senha').value = '';
        document.getElementById('login-senha').focus();
        btn.textContent = 'Tentar novamente';
        setTimeout(() => { btn.textContent = 'Entrar no Terminal'; }, 1500);
        return;
    }

    erro.classList.add('hidden');
    estado.operadorLogado = op;

    document.getElementById('header-operador').textContent = op.nome + ' (' + op.perfil.toUpperCase() + ')';

    const btnCaixa = document.getElementById('btn-caixa-header');
    if (op.perfil === 'caixa') {
        btnCaixa.style.display = 'inline-flex';
    } else {
        btnCaixa.style.display = 'none';
    }

    document.getElementById('screen-login').classList.add('hidden');
    document.getElementById('screen-login').classList.remove('active');
    document.getElementById('screen-pdv').classList.remove('hidden');
    document.getElementById('screen-pdv').classList.add('active');
    document.getElementById('screen-pdv').style.display = 'flex';

    inicializarPDV();
    mostrarToast('Bem-vindo(a), ' + op.nome + '! ✅', 'sucesso');
}

function fazerLogout() {
    estado.operadorLogado = null;
    estado.mesaAtiva = null;

    document.getElementById('login-codigo').value = '';
    document.getElementById('login-senha').value = '';
    document.getElementById('login-erro').classList.add('hidden');

    document.getElementById('screen-pdv').classList.add('hidden');
    document.getElementById('screen-pdv').classList.remove('active');
    document.getElementById('screen-login').classList.remove('hidden');
    document.getElementById('screen-login').classList.add('active');
    document.getElementById('login-codigo').focus();
}

// ─── INICIALIZAR PDV ───────────────────────

function inicializarPDV() {
    renderizarCategorias();
    renderizarItens(null);
    atualizarBadgeMesa();
    renderizarPedido();
}

// ─── CATEGORIAS ────────────────────────────

let catAtiva = null;

function renderizarCategorias() {
    const cats = [...new Set(CARDAPIO.map(i => i.cat))];
    const tabs = document.getElementById('categorias-tabs');

    let html = '<button class="tab-cat ' + (catAtiva === null ? 'ativo' : '') + '" onclick="filtrarCategoria(null)">Todos</button>';
    cats.forEach(c => {
        html += '<button class="tab-cat ' + (catAtiva === c ? 'ativo' : '') + '" onclick="filtrarCategoria(\'' + c + '\')">' + c + '</button>';
    });
    tabs.innerHTML = html;
}

function filtrarCategoria(cat) {
    catAtiva = cat;
    document.getElementById('busca-input').value = '';
    renderizarCategorias();
    renderizarItens(cat);
}

// ─── ITENS DO CARDÁPIO ──────────────────────

function renderizarItens(cat, busca) {
    let lista = CARDAPIO;
    if (cat) lista = lista.filter(i => i.cat === cat);
    if (busca) {
        const b = busca.toLowerCase();
        lista = lista.filter(i => i.nome.toLowerCase().includes(b) || i.desc.toLowerCase().includes(b));
    }

    const grid = document.getElementById('itens-grid');
    if (lista.length === 0) {
        grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:var(--texto3);padding:2rem;font-size:0.9rem;">Nenhum item encontrado.</div>';
        return;
    }

    grid.innerHTML = lista.map(item => `
    <div class="item-card" onclick="adicionarItem(${item.id})">
      <div class="item-emoji">${item.emoji}</div>
      <div class="item-nome">${item.nome}</div>
      <div class="item-desc">${item.desc}</div>
      <div class="item-preco">${moeda(item.preco)}</div>
    </div>
  `).join('');
}

function filtrarItens() {
    const busca = document.getElementById('busca-input').value;
    renderizarItens(catAtiva, busca);
}

// ─── MESAS ─────────────────────────────────

function abrirModalMesas() {
    renderizarGridMesas();
    document.getElementById('modal-mesas').classList.remove('hidden');
}

function renderizarGridMesas() {
    const grid = document.getElementById('mesas-grid');
    let html = '';

    for (let n = 1; n <= 100; n++) {
        const nome = 'Mesa ' + String(n).padStart(2, '0');
        const mesa = estado.mesas[nome];
        const ativa = estado.mesaAtiva === nome;

        let classe = 'mesa-btn';
        let icone = '';

        if (ativa) {
            classe += ' mesa-selecionada';
            icone = '★';
        } else if (mesa) {
            if (mesa.status === 'salvo') {
                classe += ' mesa-salva';
                icone = '💾';
            } else {
                classe += ' mesa-aberta';
                icone = '●';
            }
        }

        const qtdInfo = mesa ? mesa.itens.reduce((s, i) => s + i.qtd, 0) : 0;
        const title = mesa ?
            (ativa ? 'Mesa ativa' : (mesa.status === 'salvo' ? 'Pedido salvo' : qtdInfo + ' itens')) :
            'Livre';

        html += `<button class="${classe}" onclick="selecionarMesa('${nome}')" title="${title}">
      <span class="mesa-num">${n}</span>
      ${icone ? `<span class="mesa-icone">${icone}</span>` : ''}
    </button>`;
  }

  grid.innerHTML = html;
}

function selecionarMesa(nome) {
  // Se a mesa não existe ainda, cria ela agora
  if (!estado.mesas[nome]) {
    estado.mesas[nome] = { itens: [], obs: '', status: 'aberto' };
    mostrarToast('🪑 ' + nome + ' aberta!', 'sucesso');
  }

  estado.mesaAtiva = nome;
  atualizarBadgeMesa();
  renderizarGridMesas();
  renderizarPedido();
  fecharModal('modal-mesas');
}

function atualizarBadgeMesa() {
  const badge  = document.getElementById('mesa-ativa-badge');
  const label  = document.getElementById('mesa-label');

  if (estado.mesaAtiva) {
    badge.textContent = estado.mesaAtiva;
    badge.classList.remove('hidden');
    label.textContent = 'Trocar Mesa';
  } else {
    badge.classList.add('hidden');
    label.textContent = 'Escolher Mesa';
  }
}

// ─── PEDIDO ────────────────────────────────

function adicionarItem(id) {
  if (!estado.mesaAtiva) {
    mostrarToast('Selecione ou crie uma mesa primeiro!', 'erro');
    return;
  }
  const item = CARDAPIO.find(i => i.id === id);
  const mesa = estado.mesas[estado.mesaAtiva];

  const existente = mesa.itens.find(i => i.id === id);
  if (existente) {
    existente.qtd++;
  } else {
    mesa.itens.push({ id: item.id, nome: item.nome, emoji: item.emoji, preco: item.preco, qtd: 1 });
  }

  mesa.status = 'aberto';
  renderizarPedido();
  mostrarToast(item.emoji + ' ' + item.nome + ' adicionado!');
}

function alterarQtd(id, delta) {
  if (!estado.mesaAtiva) return;
  const mesa = estado.mesas[estado.mesaAtiva];
  const idx  = mesa.itens.findIndex(i => i.id === id);
  if (idx === -1) return;

  mesa.itens[idx].qtd += delta;
  if (mesa.itens[idx].qtd <= 0) mesa.itens.splice(idx, 1);

  renderizarPedido();
}

function removerItem(id) {
  if (!estado.mesaAtiva) return;
  const mesa = estado.mesas[estado.mesaAtiva];
  mesa.itens = mesa.itens.filter(i => i.id !== id);
  renderizarPedido();
}

function calcularTotais(itens) {
  const subtotal = itens.reduce((s, i) => s + i.preco * i.qtd, 0);
  const taxa     = subtotal * 0.10;
  const total    = subtotal + taxa;
  return { subtotal, taxa, total };
}

function renderizarPedido() {
  const mesa = estado.mesaAtiva ? estado.mesas[estado.mesaAtiva] : null;

  document.getElementById('pedido-titulo').textContent = estado.mesaAtiva || 'Selecione uma mesa';

  const statusEl = document.getElementById('pedido-status');
  if (mesa) {
    statusEl.textContent = mesa.status === 'salvo' ? 'Salvo' : 'Em aberto';
    statusEl.className   = 'status-badge ' + (mesa.status === 'salvo' ? 'status-salvo' : 'status-aberto');
  } else {
    statusEl.textContent = '';
    statusEl.className   = 'status-badge';
  }

  const lista = document.getElementById('pedido-lista');
  const obsInput = document.getElementById('obs-input');

  if (!mesa || mesa.itens.length === 0) {
    lista.innerHTML = '<div class="pedido-vazio"><span>🍽️</span><p>Nenhum item adicionado</p></div>';
    obsInput.value = mesa ? mesa.obs : '';
    atualizarTotais(0, 0, 0);
    return;
  }

  obsInput.value = mesa.obs;

  lista.innerHTML = mesa.itens.map(item => `
    <div class="pedido-item">
      <span class="pi-emoji">${item.emoji}</span>
      <div class="pi-info">
        <div class="pi-nome">${item.nome}</div>
        <div class="pi-preco-unit">${moeda(item.preco)} cada</div>
      </div>
      <div class="pi-controles">
        <button class="pi-btn" onclick="alterarQtd(${item.id}, -1)">−</button>
        <span class="pi-qtd">${item.qtd}</span>
        <button class="pi-btn" onclick="alterarQtd(${item.id}, 1)">+</button>
      </div>
      <span class="pi-total">${moeda(item.preco * item.qtd)}</span>
      <button class="pi-del" onclick="removerItem(${item.id})" title="Remover">✕</button>
    </div>
  `).join('');

  const { subtotal, taxa, total } = calcularTotais(mesa.itens);
  atualizarTotais(subtotal, taxa, total);
}

function atualizarTotais(subtotal, taxa, total) {
  document.getElementById('subtotal').textContent    = moeda(subtotal);
  document.getElementById('taxa').textContent        = moeda(taxa);
  document.getElementById('total-final').textContent = moeda(total);
}

// ─── SALVAR PEDIDO ─────────────────────────

function salvarPedido() {
  if (!estado.mesaAtiva) { mostrarToast('Selecione uma mesa!', 'erro'); return; }
  const mesa = estado.mesas[estado.mesaAtiva];
  if (mesa.itens.length === 0) { mostrarToast('Adicione itens ao pedido!', 'erro'); return; }

  mesa.obs    = document.getElementById('obs-input').value;
  mesa.status = 'salvo';
  renderizarPedido();
  mostrarToast('Pedido salvo com sucesso! 💾', 'sucesso');
}

// ─── FECHAR CONTA ──────────────────────────

let pagamentoSelecionado = null;

function fecharConta() {
  if (!estado.mesaAtiva) { mostrarToast('Selecione uma mesa!', 'erro'); return; }
  const mesa = estado.mesas[estado.mesaAtiva];
  if (mesa.itens.length === 0) { mostrarToast('O pedido está vazio!', 'erro'); return; }

  pagamentoSelecionado = null;
  document.querySelectorAll('.btn-pgto').forEach(b => b.classList.remove('selecionado'));
  document.getElementById('troco-box').classList.add('hidden');
  document.getElementById('pgto-selecionado').classList.add('hidden');
  document.getElementById('btn-confirmar-pgto').disabled = true;

  const { subtotal, taxa, total } = calcularTotais(mesa.itens);

  document.getElementById('conta-detalhes').innerHTML = `
    <div class="conta-titulo">Itens do pedido — ${estado.mesaAtiva}</div>
    <div class="conta-itens">
      ${mesa.itens.map(i => `
        <div class="conta-item">
          <span class="conta-item-nome">${i.emoji} ${i.nome} × ${i.qtd}</span>
          <span class="conta-item-val">${moeda(i.preco * i.qtd)}</span>
        </div>
      `).join('')}
    </div>
    ${mesa.obs ? `<div style="font-size:0.8rem;color:var(--texto3);margin-bottom:0.5rem;">Obs: ${mesa.obs}</div>` : ''}
    <div class="conta-totais">
      <div class="conta-total-linha"><span>Subtotal</span><span>${moeda(subtotal)}</span></div>
      <div class="conta-total-linha"><span>Taxa de serviço (10%)</span><span>${moeda(taxa)}</span></div>
      <div class="conta-total-linha grande"><span>TOTAL</span><span>${moeda(total)}</span></div>
    </div>
  `;

  document.getElementById('modal-conta').classList.remove('hidden');
}

function selecionarPagamento(tipo) {
  pagamentoSelecionado = tipo;

  document.querySelectorAll('.btn-pgto').forEach(b => b.classList.remove('selecionado'));
  event.target.classList.add('selecionado');

  const trocoBox = document.getElementById('troco-box');
  const pgtoEl   = document.getElementById('pgto-selecionado');

  if (tipo === 'dinheiro') {
    trocoBox.classList.remove('hidden');
    document.getElementById('valor-recebido').value = '';
    document.getElementById('troco-resultado').textContent = '';
    pgtoEl.classList.add('hidden');
    document.getElementById('btn-confirmar-pgto').disabled = true;
  } else {
    trocoBox.classList.add('hidden');
    const nomes = { credito: '💳 Cartão de Crédito', debito: '💳 Cartão de Débito', pix: '📲 PIX' };
    pgtoEl.textContent = nomes[tipo] + ' selecionado';
    pgtoEl.classList.remove('hidden');
    document.getElementById('btn-confirmar-pgto').disabled = false;
  }
}

function calcularTroco() {
  const mesa  = estado.mesas[estado.mesaAtiva];
  const { total } = calcularTotais(mesa.itens);
  const recebido  = parseFloat(document.getElementById('valor-recebido').value) || 0;
  const resultado = document.getElementById('troco-resultado');
  const btn       = document.getElementById('btn-confirmar-pgto');

  if (recebido >= total) {
    const troco = recebido - total;
    resultado.innerHTML = '<span style="color:#86EFAC;font-weight:600;">Troco: ' + moeda(troco) + '</span>';
    btn.disabled = false;
  } else if (recebido > 0) {
    const falta = total - recebido;
    resultado.innerHTML = '<span style="color:#FCA5A5;">Falta: ' + moeda(falta) + '</span>';
    btn.disabled = true;
  } else {
    resultado.textContent = '';
    btn.disabled = true;
  }
}

function confirmarPagamento() {
  const mesa = estado.mesas[estado.mesaAtiva];
  const { total } = calcularTotais(mesa.itens);
  const agora = new Date();

  estado.transacoes.push({
    mesa:      estado.mesaAtiva,
    total:     total,
    pagamento: pagamentoSelecionado,
    operador:  estado.operadorLogado.nome,
    hora:      agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    itens:     [...mesa.itens],
  });

  // Fechar mesa
  delete estado.mesas[estado.mesaAtiva];
  estado.mesaAtiva = null;

  fecharModal('modal-conta');
  atualizarBadgeMesa();
  renderizarPedido();

  mostrarToast('✅ Pagamento confirmado! Conta fechada.', 'sucesso');
}

// ─── PAINEL DO CAIXA ───────────────────────

function abrirCaixa() {
  if (estado.operadorLogado?.perfil !== 'caixa') {
    mostrarToast('Acesso restrito ao caixa!', 'erro');
    return;
  }

  const trans = estado.transacoes;
  const totalGeral = trans.reduce((s, t) => s + t.total, 0);
  const dinheiro   = trans.filter(t => t.pagamento === 'dinheiro').reduce((s, t) => s + t.total, 0);
  const cartoes    = trans.filter(t => t.pagamento === 'credito' || t.pagamento === 'debito').reduce((s, t) => s + t.total, 0);
  const pix        = trans.filter(t => t.pagamento === 'pix').reduce((s, t) => s + t.total, 0);

  const tagMap = { dinheiro: 'tag-dinheiro', credito: 'tag-credito', debito: 'tag-debito', pix: 'tag-pix' };
  const nomeMap = { dinheiro: 'Dinheiro', credito: 'Crédito', debito: 'Débito', pix: 'PIX' };

  const linhas = trans.length > 0
    ? trans.slice().reverse().map(t => `
        <tr>
          <td>${t.hora}</td>
          <td>${t.mesa}</td>
          <td>${t.operador}</td>
          <td><span class="pgto-tag ${tagMap[t.pagamento]}">${nomeMap[t.pagamento]}</span></td>
          <td style="font-weight:600;color:var(--dendê-claro);">${moeda(t.total)}</td>
        </tr>
      `).join('')
    : '<tr><td colspan="5" style="text-align:center;color:var(--texto3);padding:1.5rem;">Nenhuma transação registrada.</td></tr>';

  document.getElementById('caixa-conteudo').innerHTML = `
    <div class="caixa-resumo">
      <div class="caixa-card">
        <div class="cc-label">Total do Dia</div>
        <div class="cc-valor">${moeda(totalGeral)}</div>
      </div>
      <div class="caixa-card">
        <div class="cc-label">Dinheiro</div>
        <div class="cc-valor" style="color:#86EFAC;">${moeda(dinheiro)}</div>
      </div>
      <div class="caixa-card">
        <div class="cc-label">Cartões + PIX</div>
        <div class="cc-valor" style="color:#93C5FD;">${moeda(cartoes + pix)}</div>
      </div>
    </div>

    <div class="caixa-transacoes">
      <h3>Histórico de Transações (${trans.length})</h3>
      <table class="caixa-tabela">
        <thead>
          <tr>
            <th>Hora</th>
            <th>Mesa</th>
            <th>Operador</th>
            <th>Pagamento</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>${linhas}</tbody>
      </table>
    </div>
  `;

  document.getElementById('modal-caixa').classList.remove('hidden');
}

// ─── INICIAR ───────────────────────────────

document.getElementById('login-codigo').focus();