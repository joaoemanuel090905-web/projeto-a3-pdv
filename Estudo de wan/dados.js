// =============================================
//  DENDÊ & SABOR — dados.js
//  Operadores, Cardápio e Estado Global
// =============================================

// ---------- OPERADORES ----------
const OPERADORES = [
    { codigo: "001", senha: "3030", nome: "Garçom Lauan", perfil: "garcom" },
    { codigo: "002", senha: "2020", nome: "Garçom Marcos", perfil: "garcom" },
    { codigo: "003", senha: "1010", nome: "Garçom Kauã", perfil: "garcom" },
    { codigo: "999", senha: "9999", nome: "Caixa — João", perfil: "caixa" },
];

// ---------- CARDÁPIO ----------
const CARDAPIO = [

    // ── ENTRADAS / TIRA-GOSTO ──────────────────────────────────────────────
    { id: 1, cat: "Entradas", emoji: "🥘", nome: "Acarajé Tradicional", desc: "Feijão-fradinho frito com vatapá e camarão", preco: 22.90 },
    { id: 2, cat: "Entradas", emoji: "🥗", nome: "Salada de Frutos do Mar", desc: "Mix fresco com temperos baianos", preco: 32.00 },
    { id: 3, cat: "Entradas", emoji: "🌶️", nome: "Caldo de Sururu", desc: "Caldo cremoso com marisco e dendê", preco: 18.50 },
    { id: 4, cat: "Entradas", emoji: "🍤", nome: "Bolinhos de Tapioca", desc: "Recheados com queijo coalho", preco: 16.00 },
    { id: 5, cat: "Entradas", emoji: "🐟", nome: "Peixe Frito (Tira-Gosto)", desc: "Filés crocantes temperados, porção p/ 2", preco: 38.00 },
    { id: 6, cat: "Entradas", emoji: "🐟", nome: "Peixe Frito Inteiro", desc: "Peixe inteiro frito, acompanha pirão e limão", preco: 55.00 },
    { id: 7, cat: "Entradas", emoji: "🦐", nome: "Camarão Frito (Tira-Gosto)", desc: "Camarão empanado e frito, porção p/ 2", preco: 45.00 },
    { id: 8, cat: "Entradas", emoji: "🐙", nome: "Polvo Grelhado (Entrada)", desc: "Polvo macio grelhado no azeite e alho", preco: 52.00 },
    { id: 9, cat: "Entradas", emoji: "🦑", nome: "Isca de Lula Frita", desc: "Lula empanada, crocante, com molho tártaro", preco: 42.00 },
    { id: 10, cat: "Entradas", emoji: "🍢", nome: "Espetinho de Camarão", desc: "4 espetinhos grelhados com farofa de dendê", preco: 36.00 },
    { id: 11, cat: "Entradas", emoji: "🧀", nome: "Queijo Coalho Grelhado", desc: "Porção com mel de engenho", preco: 22.00 },
    { id: 12, cat: "Entradas", emoji: "🥘", nome: "Casquinha de Siri", desc: "Recheio cremoso de siri gratinado", preco: 28.00 },

    // ── MOQUECAS ──────────────────────────────────────────────────────────
    { id: 13, cat: "Moquecas", emoji: "🍲", nome: "Moqueca de Peixe", desc: "Robalo no leite de coco e dendê — serve 1", preco: 65.90 },
    { id: 14, cat: "Moquecas", emoji: "🍲", nome: "Moqueca de Peixe (2 pax)", desc: "Robalo generoso para 2 pessoas", preco: 118.00 },
    { id: 15, cat: "Moquecas", emoji: "🦐", nome: "Moqueca de Camarão", desc: "Camarão fresco na moqueca baiana — serve 1", preco: 72.00 },
    { id: 16, cat: "Moquecas", emoji: "🦐", nome: "Moqueca de Camarão (2 pax)", desc: "Camarão generoso para 2 pessoas", preco: 132.00 },
    { id: 17, cat: "Moquecas", emoji: "🐙", nome: "Moqueca de Polvo", desc: "Polvo tenro com leite de coco, pimentões e dendê", preco: 85.00 },
    { id: 18, cat: "Moquecas", emoji: "🦑", nome: "Moqueca de Lula", desc: "Lula fresca no caldo baiano com pirão", preco: 75.00 },
    { id: 19, cat: "Moquecas", emoji: "🐚", nome: "Moqueca Mista", desc: "Peixe + camarão + polvo — para 2", preco: 145.00 },
    { id: 20, cat: "Moquecas", emoji: "🦀", nome: "Moqueca de Caranguejo", desc: "Caranguejo ao molho de dendê com pirão", preco: 90.00 },
    { id: 21, cat: "Moquecas", emoji: "🐟", nome: "Moqueca de Badejo", desc: "Badejo fresco no leite de coco — serve 1", preco: 70.00 },

    // ── PRATOS PRINCIPAIS ─────────────────────────────────────────────────
    { id: 22, cat: "Principais", emoji: "🐟", nome: "Peixe Frito (Refeição)", desc: "Peixe inteiro frito + arroz + feijão + farofa", preco: 62.00 },
    { id: 23, cat: "Principais", emoji: "🦐", nome: "Camarão Frito (Refeição)", desc: "Camarão frito + arroz + feijão + vinagrete", preco: 68.00 },
    { id: 24, cat: "Principais", emoji: "🐚", nome: "Bobó de Camarão", desc: "Camarão ao molho de macaxeira e dendê", preco: 68.00 },
    { id: 25, cat: "Principais", emoji: "🥩", nome: "Carne de Sol Grelhada", desc: "Com manteiga de garrafa, arroz e feijão", preco: 55.00 },
    { id: 26, cat: "Principais", emoji: "🫘", nome: "Feijão Tropeiro Baiano", desc: "Feijão com farofa, bacon e linguiça", preco: 42.00 },
    { id: 27, cat: "Principais", emoji: "🐟", nome: "Peixe na Telha", desc: "Peixe inteiro assado com legumes da época", preco: 78.00 },
    { id: 28, cat: "Principais", emoji: "🍛", nome: "Xinxim de Galinha", desc: "Frango com amendoim, gengibre e dendê", preco: 52.00 },
    { id: 29, cat: "Principais", emoji: "🌽", nome: "Vatapá com Arroz", desc: "Clássico baiano com camarão seco", preco: 45.00 },
    { id: 30, cat: "Principais", emoji: "🐙", nome: "Polvo ao Alho e Óleo", desc: "Polvo grelhado com arroz e legumes", preco: 88.00 },

    // ── ACOMPANHAMENTOS ───────────────────────────────────────────────────
    { id: 31, cat: "Acomp.", emoji: "🍚", nome: "Arroz Branco", desc: "Porção individual", preco: 8.00 },
    { id: 32, cat: "Acomp.", emoji: "🫘", nome: "Feijão Preto", desc: "Com bacon e temperos", preco: 10.00 },
    { id: 33, cat: "Acomp.", emoji: "🟡", nome: "Farofa de Dendê", desc: "Acompanha pratos tradicionais", preco: 9.00 },
    { id: 34, cat: "Acomp.", emoji: "🥔", nome: "Macaxeira Cozida", desc: "Com manteiga de garrafa e sal grosso", preco: 12.00 },
    { id: 35, cat: "Acomp.", emoji: "🥗", nome: "Vinagrete Baiano", desc: "Tomate, cebola, coentro e pimenta", preco: 8.00 },
    { id: 36, cat: "Acomp.", emoji: "🍞", nome: "Pirão de Peixe", desc: "Pirão caseiro feito no caldo do peixe", preco: 11.00 },
    { id: 37, cat: "Acomp.", emoji: "🥗", nome: "Salada Simples", desc: "Alface, tomate, pepino e cenoura", preco: 9.00 },

    // ── SUCOS NATURAIS ────────────────────────────────────────────────────
    { id: 38, cat: "Sucos", emoji: "🍍", nome: "Suco de Abacaxi", desc: "Natural ou com hortelã, 500ml", preco: 11.00 },
    { id: 39, cat: "Sucos", emoji: "🌺", nome: "Suco de Maracujá", desc: "Polpa fresca com pouco açúcar, 500ml", preco: 11.00 },
    { id: 40, cat: "Sucos", emoji: "🟡", nome: "Suco de Cajá", desc: "Fruta típica do Nordeste, 500ml", preco: 12.00 },
    { id: 41, cat: "Sucos", emoji: "🥭", nome: "Suco de Manga", desc: "Manga Palmer natural, 500ml", preco: 11.00 },
    { id: 42, cat: "Sucos", emoji: "🍓", nome: "Suco de Acerola", desc: "Rico em vitamina C, 500ml", preco: 11.00 },
    { id: 43, cat: "Sucos", emoji: "🍊", nome: "Suco de Laranja", desc: "Espremido na hora, 500ml", preco: 10.00 },
    { id: 44, cat: "Sucos", emoji: "🫐", nome: "Suco de Umbu", desc: "Fruta sertaneja típica, 500ml", preco: 12.00 },
    { id: 45, cat: "Sucos", emoji: "🍉", nome: "Suco de Melancia", desc: "Gelado e natural, 500ml", preco: 10.00 },
    { id: 46, cat: "Sucos", emoji: "🍌", nome: "Vitamina de Banana", desc: "Banana com leite e mel, 400ml", preco: 12.00 },
    { id: 47, cat: "Sucos", emoji: "🥥", nome: "Suco de Caju", desc: "Polpa fresca da região, 500ml", preco: 11.00 },
    { id: 48, cat: "Sucos", emoji: "🍋", nome: "Limonada Suíça", desc: "Limão, leite condensado e creme, 400ml", preco: 14.00 },
    { id: 49, cat: "Sucos", emoji: "🌿", nome: "Suco Detox Verde", desc: "Couve, pepino, maçã e gengibre, 400ml", preco: 14.00 },

    // ── CAIPIRINHAS ───────────────────────────────────────────────────────
    { id: 50, cat: "Caipirinhas", emoji: "🍋", nome: "Caipirinha de Limão", desc: "Cachaça artesanal, limão taiti e açúcar", preco: 16.00 },
    { id: 51, cat: "Caipirinhas", emoji: "🌺", nome: "Caipirinha de Maracujá", desc: "Cachaça artesanal com polpa de maracujá", preco: 18.00 },
    { id: 52, cat: "Caipirinhas", emoji: "🍍", nome: "Caipirinha de Abacaxi", desc: "Cachaça com abacaxi e hortelã", preco: 18.00 },
    { id: 53, cat: "Caipirinhas", emoji: "🥭", nome: "Caipirinha de Manga", desc: "Cachaça com manga Palmer e limão", preco: 18.00 },
    { id: 54, cat: "Caipirinhas", emoji: "🟡", nome: "Caipirinha de Cajá", desc: "Cachaça com polpa de cajá", preco: 19.00 },
    { id: 55, cat: "Caipirinhas", emoji: "🍓", nome: "Caipirinha de Morango", desc: "Cachaça com morangos frescos", preco: 19.00 },
    { id: 56, cat: "Caipirinhas", emoji: "🍑", nome: "Caipirinha de Pêssego", desc: "Cachaça com pêssego em calda", preco: 18.00 },
    { id: 57, cat: "Caipirinhas", emoji: "🫐", nome: "Caipirinha de Umbu", desc: "Cachaça com polpa de umbu — sabor sertanejo", preco: 19.00 },

    // ── CAIPIFRUTAS ───────────────────────────────────────────────────────
    { id: 58, cat: "Caipifrutas", emoji: "🍋", nome: "Caipifruta de Limão", desc: "Vodka, limão taiti, açúcar e gelo", preco: 18.00 },
    { id: 59, cat: "Caipifrutas", emoji: "🌺", nome: "Caipifruta de Maracujá", desc: "Vodka com polpa de maracujá", preco: 20.00 },
    { id: 60, cat: "Caipifrutas", emoji: "🍍", nome: "Caipifruta de Abacaxi", desc: "Vodka com abacaxi e hortelã", preco: 20.00 },
    { id: 61, cat: "Caipifrutas", emoji: "🥭", nome: "Caipifruta de Manga", desc: "Vodka com manga Palmer", preco: 20.00 },
    { id: 62, cat: "Caipifrutas", emoji: "🍓", nome: "Caipifruta de Morango", desc: "Vodka com morangos frescos", preco: 21.00 },
    { id: 63, cat: "Caipifrutas", emoji: "🍑", nome: "Caipifruta de Pêssego", desc: "Vodka com pêssego em calda", preco: 20.00 },
    { id: 64, cat: "Caipifrutas", emoji: "🟡", nome: "Caipifruta de Cajá", desc: "Vodka com polpa de cajá do sertão", preco: 21.00 },
    { id: 65, cat: "Caipifrutas", emoji: "🫐", nome: "Caipifruta Tropical", desc: "Vodka, abacaxi, maracujá e hortelã", preco: 22.00 },

    // ── CAIPIROSKI ────────────────────────────────────────────────────────
    { id: 66, cat: "Caipiroska", emoji: "🍋", nome: "Caipiroska de Limão", desc: "Vodka premium, limão siciliano e açúcar", preco: 20.00 },
    { id: 67, cat: "Caipiroska", emoji: "🌺", nome: "Caipiroska de Maracujá", desc: "Vodka premium com polpa de maracujá", preco: 22.00 },
    { id: 68, cat: "Caipiroska", emoji: "🍍", nome: "Caipiroska de Abacaxi", desc: "Vodka premium, abacaxi e folhas de hortelã", preco: 22.00 },
    { id: 69, cat: "Caipiroska", emoji: "🍓", nome: "Caipiroska de Morango", desc: "Vodka premium com morangos e limão", preco: 23.00 },
    { id: 70, cat: "Caipiroska", emoji: "🥭", nome: "Caipiroska de Manga", desc: "Vodka premium com manga Palmer", preco: 22.00 },
    { id: 71, cat: "Caipiroska", emoji: "🍑", nome: "Caipiroska de Pêssego", desc: "Vodka premium com pêssego em calda", preco: 22.00 },
    { id: 72, cat: "Caipiroska", emoji: "🟡", nome: "Caipiroska de Cajá", desc: "Vodka premium com polpa de cajá", preco: 23.00 },
    { id: 73, cat: "Caipiroska", emoji: "🫐", nome: "Caipiroska Tropical", desc: "Vodka premium, maracujá, abacaxi e hortelã", preco: 24.00 },

    // ── BEBIDAS ───────────────────────────────────────────────────────────
    { id: 74, cat: "Bebidas", emoji: "🍺", nome: "Cerveja Long Neck", desc: "Brahma, Skol ou Itaipava 355ml", preco: 9.00 },
    { id: 75, cat: "Bebidas", emoji: "🍺", nome: "Cerveja 600ml", desc: "Gelada bem gelada", preco: 14.00 },
    { id: 76, cat: "Bebidas", emoji: "🍺", nome: "Cerveja Artesanal", desc: "IPA ou Witbier local — 355ml", preco: 18.00 },
    { id: 77, cat: "Bebidas", emoji: "🥤", nome: "Refrigerante Lata", desc: "Coca, Guaraná, Sprite 350ml", preco: 6.00 },
    { id: 78, cat: "Bebidas", emoji: "🥤", nome: "Refrigerante 2L", desc: "Coca, Guaraná, Sprite", preco: 14.00 },
    { id: 79, cat: "Bebidas", emoji: "🥥", nome: "Água de Coco", desc: "Natural — coco verde fresco", preco: 8.00 },
    { id: 80, cat: "Bebidas", emoji: "💧", nome: "Água Mineral", desc: "Com ou sem gás 500ml", preco: 4.00 },
    { id: 81, cat: "Bebidas", emoji: "🍷", nome: "Vinho Tinto Taça", desc: "Vinho tinto suave ou seco", preco: 22.00 },
    { id: 82, cat: "Bebidas", emoji: "🍾", nome: "Espumante Taça", desc: "Espumante brut gelado", preco: 24.00 },

    // ── SOBREMESAS ────────────────────────────────────────────────────────
    { id: 83, cat: "Sobremesas", emoji: "🍮", nome: "Pudim de Tapioca", desc: "Com calda de caramelo e coco ralado", preco: 16.00 },
    { id: 84, cat: "Sobremesas", emoji: "🍌", nome: "Banana Foster Baiana", desc: "Banana flambada na cachaça com sorvete", preco: 19.00 },
    { id: 85, cat: "Sobremesas", emoji: "🥭", nome: "Mousse de Cupuaçu", desc: "Cremoso com frutas tropicais", preco: 17.00 },
    { id: 86, cat: "Sobremesas", emoji: "🍰", nome: "Bolo de Milho", desc: "Caseiro com cobertura de doce de leite", preco: 14.00 },
    { id: 87, cat: "Sobremesas", emoji: "🍦", nome: "Sorvete de Coco", desc: "Artesanal com coco fresco, 2 bolas", preco: 15.00 },
    { id: 88, cat: "Sobremesas", emoji: "🥥", nome: "Cocada Baiana", desc: "Mole ou dura, receita tradicional", preco: 10.00 },
];

// ---------- ESTADO GLOBAL ----------
let estado = {
    operadorLogado: null,
    mesaAtiva: null,
    mesas: {}, // { "Mesa 01": { itens: [], obs: "", status: "aberto" } }
    transacoes: [], // histórico de pagamentos
    proximaMesa: 1,
};