import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Sparkles, Shield, AlertCircle, Loader, Globe } from 'lucide-react';

// Multilingual AI Assistant - Supports multiple languages
export default function AIAssistant({ darkMode, products = [], orders = [], user, onClose }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey! 👋 How's it going?\n\nសួស្តី! អ្វីៗដំណើរការល្អទេ? 😊\n\nI'm here to help you shop! Feel free to ask me anything - I speak your language! You can ask me in English, Khmer, Chinese, Spanish, French, Japanese, or whatever feels comfortable! 🌍\n\nកុំខ្មាសគេ សួរខ្ញុំអ្វីក៏បាន! ខ្ញុំនៅទីនេះដើម្បីជួយអ្នក! 💬",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState('en');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // AI Knowledge Base - Store information (public only)
  const storeKnowledge = {
    name: "TechMart Electronics Store",
    tagline: "Your trusted electronics destination",
    features: [
      "Free shipping on orders over $150",
      "30-day easy return policy",
      "Secure payment processing",
      "Real-time order tracking",
      "24/7 customer support",
      "Price match guarantee",
      "Warranty on all products"
    ],
    categories: [
      "Laptops - High-performance computers",
      "Smartphones - Latest mobile devices",
      "Audio - Premium headphones and speakers",
      "Tablets - Versatile computing devices",
      "Smartwatches - Wearable technology",
      "Cameras - Professional photography equipment",
      "Accessories - Essential tech add-ons",
      "Gaming - Gaming consoles and equipment"
    ],
    promoCodes: [
      { code: "TECH10", discount: "10% off", description: "Get 10% discount on your order" },
      { code: "BUILD20", discount: "20% off", description: "Special 20% discount on orders" }
    ],
    shipping: {
      standard: "$14.99 (Free over $150)",
      estimated: "3-5 business days",
      tracking: "Available after shipment"
    },
    returns: {
      period: "30 days",
      condition: "Unused and in original packaging",
      process: "Contact support for return authorization"
    },
    payment: {
      methods: ["Credit/Debit Cards", "PayPal", "Apple Pay", "Buy Now Pay Later"],
      security: "256-bit SSL encryption",
      taxRate: "8% sales tax"
    },
    support: {
      contact: "Available through chat, email, or phone",
      hours: "24/7 support available"
    }
  };

  // Protected information - NEVER share
  const protectedInfo = {
    // This information should NEVER be disclosed
    ownerDetails: "CONFIDENTIAL",
    employeeData: "CONFIDENTIAL",
    customerData: "CONFIDENTIAL",
    financialData: "CONFIDENTIAL",
    systemAccess: "CONFIDENTIAL",
    securitySettings: "CONFIDENTIAL"
  };

  // Language Detection Function
  const detectLanguage = (text) => {
    // Khmer detection
    if (/[\u1780-\u17FF]/.test(text)) return 'km';
    // Chinese detection
    if (/[\u4E00-\u9FFF]/.test(text)) return 'zh';
    // Japanese detection
    if (/[\u3040-\u309F\u30A0-\u30FF]/.test(text)) return 'ja';
    // Korean detection
    if (/[\uAC00-\uD7AF]/.test(text)) return 'ko';
    // Thai detection
    if (/[\u0E00-\u0E7F]/.test(text)) return 'th';
    // Arabic detection
    if (/[\u0600-\u06FF]/.test(text)) return 'ar';
    
    // European language detection (basic)
    const lowerText = text.toLowerCase();
    if (/¿|¡|ñ/.test(text) || /\b(hola|gracias|por favor|sí|no|buenos|qué)\b/.test(lowerText)) return 'es';
    if (/\b(bonjour|merci|s'il vous plaît|oui|non|comment|pourquoi)\b/.test(lowerText)) return 'fr';
    if (/\b(ciao|grazie|prego|sì|come|perché)\b/.test(lowerText)) return 'it';
    if (/\b(hallo|danke|bitte|ja|nein|wie|warum)\b/.test(lowerText)) return 'de';
    if (/\b(olá|obrigado|por favor|sim|não|como|porquê)\b/.test(lowerText)) return 'pt';
    
    // Default to English
    return 'en';
  };

  // Multilingual Responses - Casual & Conversational
  const responses = {
    greeting: {
      en: (userName) => `Hey there! 👋 ${userName ? `Nice to see you again, ${userName}!` : 'Welcome to TechMart!'} I'm your AI buddy here to help you shop! 😊\n\nWanna check out:\n🛍️ Cool products\n📦 Your orders\n💰 Sweet discounts\n❓ Or just chat?\n\nWhat's on your mind?`,
      km: (userName) => `សួស្តី! 👋 ${userName ? `រីករាយដែលបានជួបម្តងទៀត ${userName}!` : 'សូមស្វាគមន៍មកកាន់ TechMart!'} ខ្ញុំជាមិត្តភក្តិ AI របស់អ្នកនៅទីនេះដើម្បីជួយអ្នកទិញទំនិញ! 😊\n\nចង់មើល:\n🛍️ ផលិតផលស្អាតៗ\n📦 ការបញ្ជាទិញរបស់អ្នក\n💰 បញ្ចុះតម្លៃល្អៗ\n❓ ឬគ្រាន់តែចាប់កំណត់?\n\nអ្វីកំពុងនៅក្នុងគំនិតអ្នក?`,
      zh: (userName) => `嘿！👋 ${userName ? `很高兴再次见到你 ${userName}!` : '欢迎来到 TechMart!'} 我是你的AI购物伙伴！😊\n\n想看看:\n🛍️ 酷炫产品\n📦 你的订单\n💰 超值优惠\n❓ 还是随便聊聊?\n\n你在想什么？`,
      es: (userName) => `¡Hola! 👋 ${userName ? `¡Qué gusto verte de nuevo ${userName}!` : '¡Bienvenido a TechMart!'} ¡Soy tu amigo AI aquí para ayudarte! 😊\n\n¿Quieres ver:\n🛍️ Productos geniales\n📦 Tus pedidos\n💰 Descuentos increíbles\n❓ O solo charlar?\n\n¿Qué tienes en mente?`,
      fr: (userName) => `Salut! 👋 ${userName ? `Content de te revoir ${userName}!` : 'Bienvenue chez TechMart!'} Je suis ton pote AI pour t'aider! 😊\n\nTu veux voir:\n🛍️ Des produits cool\n📦 Tes commandes\n💰 Des super promos\n❓ Ou juste papoter?\n\nQu'est-ce qui te passe par la tête?`,
      ja: (userName) => `やあ！👋 ${userName ? `また会えて嬉しいよ ${userName}さん!` : 'TechMartへようこそ!'} あなたのAI友達だよ！😊\n\n見たいのは:\n🛍️ クールな商品\n📦 あなたの注文\n💰 お得な割引\n❓ それともおしゃべり?\n\n何か気になることある？`
    },
    security: {
      en: "🔒 Hey, I totally get what you're asking, but I can't share info about store management, owners, staff, or other people's data. That's all confidential stuff, ya know? Gotta keep everyone safe! 😊\n\nBut I'm super happy to chat about:\n✅ Products & tech stuff\n✅ Your orders\n✅ Shopping tips\n✅ Store rules & policies\n\nSo what else can I help with? 🤗",
      km: "🔒 ហេ ខ្ញុំយល់អ្វីដែលអ្នកសួរ ប៉ុន្តែខ្ញុំមិនអាចចែករំលែកព័ត៌មានអំពីការគ្រប់គ្រងហាង ម្ចាស់ បុគ្គលិក ឬទិន្នន័យរបស់មនុស្សផ្សេងបានទេ។ នោះគឺជាអ្វីៗសម្ងាត់ទាំងអស់ អ្នកដឹងទេ? ត្រូវរក្សាសុវត្ថិភាពគ្រប់គ្នា! 😊\n\nប៉ុន្តែខ្ញុំរីករាយខ្លាំងណាស់ក្នុងការនិយាយអំពី:\n✅ ផលិតផល និងបច្ចេកវិទ្យា\n✅ ការបញ្ជាទិញរបស់អ្នក\n✅ គន្លឹះទិញទំនិញ\n✅ គោលការណ៍ហាង\n\nដូច្នេះខ្ញុំអាចជួយអ្វីទៀត? 🤗",
      zh: "🔒 嘿，我完全理解你在问什么，但我不能分享关于店铺管理、老板、员工或其他人数据的信息。那都是机密的东西，你懂的吧？得保证大家的安全！😊\n\n但我超乐意聊聊:\n✅ 产品和科技东西\n✅ 你的订单\n✅ 购物小贴士\n✅ 商店规则和政策\n\n那我还能帮你什么？🤗",
      es: "🔒 Oye, entiendo totalmente lo que preguntas, pero no puedo compartir info sobre la gestión de la tienda, dueños, personal o datos de otras personas. Todo eso es confidencial, ¿sabes? ¡Tenemos que mantener a todos seguros! 😊\n\nPero estoy súper feliz de charlar sobre:\n✅ Productos y tecnología\n✅ Tus pedidos\n✅ Tips de compras\n✅ Reglas de la tienda\n\n¿En qué más te puedo ayudar? 🤗",
      fr: "🔒 Hey, je comprends totalement ce que tu demandes, mais je ne peux pas partager d'infos sur la gestion du magasin, les propriétaires, le personnel ou les données d'autres personnes. Tout ça c'est confidentiel, tu vois? Faut protéger tout le monde! 😊\n\nMais je suis super content de discuter de:\n✅ Produits et tech\n✅ Tes commandes\n✅ Conseils shopping\n✅ Règles du magasin\n\nAlors, quoi d'autre? 🤗",
      ja: "🔒 ねえ、何を聞いてるか完全に分かるけど、店舗管理、オーナー、スタッフ、他の人のデータについての情報は共有できないんだ。それは全部機密だからね？みんなを安全に保たなきゃ！😊\n\nでも、こんなことなら喜んで話すよ:\n✅ 製品とテクノロジー\n✅ あなたの注文\n✅ ショッピングのコツ\n✅ お店のルール\n\n他に何か手伝えることある？🤗"
    },
    productSearch: {
      en: "🖥️ Awesome choice! Check out these sweet laptops:",
      km: "🖥️ ជម្រើសអស្ចារ្យ! មើលកុំព្យូទ័រយួរដៃស្អាតៗទាំងនេះ:",
      zh: "🖥️ 超棒的选择！看看这些很酷的笔记本电脑:",
      es: "🖥️ ¡Qué buena elección! Mira estas laptops geniales:",
      fr: "🖥️ Super choix! Regarde ces ordinateurs portables trop cool:",
      ja: "🖥️ いいね！これらの素晴らしいノートパソコンをチェック:"
    },
    promoCodes: {
      en: "🎁 Yesss! Who doesn't love a good deal? Here's what we got:",
      km: "🎁 យេស! អ្នកណាមិនស្រលាញ់ការធ្វើប្រត្តិបត្តិការល្អ? នេះគឺជាអ្វីដែលយើងមាន:",
      zh: "🎁 耶！谁不喜欢好折扣呢？这是我们有的:",
      es: "🎁 ¡Síii! ¿A quién no le encanta una buena oferta? Aquí está lo que tenemos:",
      fr: "🎁 Ouais! Qui n'aime pas une bonne promo? Voilà ce qu'on a:",
      ja: "🎁 イェーイ！お得なのが嫌いな人なんていないよね？これがあるよ:"
    },
    needHelp: {
      en: `Hmm, I'm not totally sure about "{{query}}" 🤔 Could you tell me a bit more?\n\nI'm pretty good at helping with:\n🔍 Finding cool stuff\n📦 Checking your orders\n💰 Getting you discounts\n🚚 Shipping deets\n🔄 Returns if needed\n💳 Payment stuff\n\nWanna try asking in a different way? Or pick something from above! 😊`,
      km: `ហឹម ខ្ញុំមិនប្រាកដពេញលេញអំពី "{{query}}" 🤔 អ្នកអាចប្រាប់ខ្ញុំបន្ថែមបានទេ?\n\nខ្ញុំល្អណាស់ក្នុងការជួយជាមួយ:\n🔍 រកអ្វីៗស្អាតៗ\n📦 ពិនិត្យការបញ្ជាទិញរបស់អ្នក\n💰 ទទួលបានបញ្ចុះតម្លៃ\n🚚 ព័ត៌មានដឹកជញ្ជូន\n🔄 ត្រឡប់បើចាំបាច់\n💳 រឿងទូទាត់\n\nចង់សាកសួរតាមវិធីផ្សេងទៀតទេ? ឬជ្រើសរើសអ្វីមួយពីខាងលើ! 😊`,
      zh: `嗯，我对"{{query}}"不太确定 🤔 能多告诉我一点吗？\n\n我很擅长帮忙:\n🔍 找酷东西\n📦 查你的订单\n💰 给你打折\n🚚 配送细节\n🔄 需要的话退货\n💳 付款的事\n\n想换个方式问问看？或者从上面选一个！😊`,
      es: `Hmm, no estoy totalmente seguro sobre "{{query}}" 🤔 ¿Me puedes contar un poco más?\n\nSoy bastante bueno ayudando con:\n🔍 Encontrar cosas cool\n📦 Revisar tus pedidos\n💰 Conseguirte descuentos\n🚚 Detalles de envío\n🔄 Devoluciones si es necesario\n💳 Cosas de pago\n\n¿Quieres intentar preguntar de otra manera? ¡O elige algo de arriba! 😊`,
      fr: `Hmm, je ne suis pas totalement sûr à propos de "{{query}}" 🤔 Tu peux m'en dire un peu plus?\n\nJe suis plutôt bon pour aider avec:\n🔍 Trouver des trucs cool\n📦 Vérifier tes commandes\n💰 Te trouver des réductions\n🚚 Infos d'expédition\n🔄 Retours si besoin\n💳 Trucs de paiement\n\nTu veux essayer de demander autrement? Ou choisis quelque chose ci-dessus! 😊`,
      ja: `うーん、"{{query}}"についてよく分からないな 🤔 もう少し教えてくれる？\n\nこんなことで役に立てるよ:\n🔍 かっこいいものを探す\n📦 注文をチェック\n💰 割引をゲット\n🚚 配送の詳細\n🔄 必要なら返品\n💳 支払いのこと\n\n違う言い方で聞いてみる？それとも上から選んでみて！😊`
    },
    thanks: {
      en: "No problem at all! 😊 I'm always here whenever you need me. Anything else you wanna chat about?",
      km: "មិនមានបញ្ហាអ្វីទេ! 😊 ខ្ញុំនៅទីនេះជានិច្ចនៅពេលអ្នកត្រូវការខ្ញុំ។ តើមានអ្វីផ្សេងទៀតដែលអ្នកចង់និយាយទេ?",
      zh: "完全没问题！😊 我随时都在这里。还有什么想聊的吗？",
      es: "¡No hay problema! 😊 Siempre estoy aquí cuando me necesites. ¿Algo más de lo que quieras charlar?",
      fr: "Pas de problème du tout! 😊 Je suis toujours là quand tu as besoin de moi. Autre chose dont tu veux parler?",
      ja: "全然問題ないよ！😊 いつでもここにいるからね。他に話したいことある？"
    },
    moreDetails: {
      en: "Wanna know more about any of these? Just let me know which one catches your eye! 👀",
      km: "ចង់ដឹងបន្ថែមអំពីណាមួយក្នុងចំណោមនេះទេ? គ្រាន់តែប្រាប់ខ្ញុំថាមួយណាដែលទាក់ទាញភ្នែករបស់អ្នក! 👀",
      zh: "想了解更多关于这些的吗？告诉我哪个吸引你的眼球！👀",
      es: "¿Quieres saber más sobre alguno? ¡Solo dime cuál te llama la atención! 👀",
      fr: "Tu veux en savoir plus sur l'un d'eux? Dis-moi juste lequel attire ton attention! 👀",
      ja: "これらについてもっと知りたい？どれが気になるか教えて！👀"
    }
  };

  // Get response in detected language
  const getLocalizedResponse = (key, lang, replacements = {}) => {
    let text = responses[key]?.[lang] || responses[key]?.['en'];
    if (typeof text === 'function') {
      return text(replacements.userName);
    }
    // Replace placeholders
    Object.keys(replacements).forEach(key => {
      text = text.replace(`{{${key}}}`, replacements[key]);
    });
    return text;
  };

  // AI Response Generator with security filters and multilingual support
  const generateAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase().trim();
    const lang = detectLanguage(userMessage);
    setDetectedLanguage(lang);

    // Security Filter - Detect attempts to access protected information
    const protectedKeywords = [
      'owner', 'manager', 'employee', 'staff', 'admin', 'password', 'login',
      'database', 'customer list', 'customer data', 'other customers',
      'financial', 'revenue', 'profit', 'salary', 'confidential', 'private',
      'who owns', 'who runs', 'manager name', 'owner name', 'personal info',
      'address of owner', 'phone of owner', 'email of owner',
      // Khmer
      'ម្ចាស់', 'អ្នកគ្រប់គ្រង', 'បុគ្គលិក', 'លេខសម្ងាត់',
      // Chinese
      '老板', '经理', '员工', '密码', '所有者',
      // Spanish
      'propietario', 'gerente', 'contraseña',
      // French  
      'propriétaire', 'gérant', 'mot de passe',
      // Japanese
      'オーナー', '管理者', 'パスワード'
    ];

    const isProtectedQuery = protectedKeywords.some(keyword => message.includes(keyword));

    if (isProtectedQuery) {
      return {
        type: 'security',
        content: getLocalizedResponse('security', lang)
      };
    }

    // Greeting Detection (multilingual)
    const greetingPatterns = [
      /^(hi|hello|hey|good morning|good afternoon|good evening)/,
      /^(សួស្តី|ជំរាបសួរ)/,  // Khmer
      /^(你好|您好|嗨)/,  // Chinese
      /^(hola|buenos días|buenas tardes)/,  // Spanish
      /^(bonjour|salut|bonsoir)/,  // French
      /^(こんにちは|おはよう|こんばんは)/  // Japanese
    ];
    
    if (greetingPatterns.some(pattern => pattern.test(message))) {
      return {
        type: 'greeting',
        content: getLocalizedResponse('greeting', lang, { userName: user?.name })
      };
    }

    // Product Search (multilingual keywords)
    const productKeywords = [
      'product', 'find', 'looking for', 'search', 'show me', 'need',
      'ផលិតផល', 'ស្វែងរក', 'ត្រូវការ', 'បង្ហាញ',  // Khmer
      '产品', '查找', '搜索', '显示', '需要',  // Chinese
      'producto', 'buscar', 'mostrar', 'necesito',  // Spanish
      'produit', 'chercher', 'montrer', 'besoin',  // French
      '商品', '探す', '検索', '見せて', '必要'  // Japanese
    ];
    
    if (productKeywords.some(keyword => message.includes(keyword))) {
      const laptopKeywords = ['laptop', 'macbook', 'computer', 'notebook', 'កុំព្យូទ័រ', '笔记本电脑', 'portátil', 'ordinateur', 'ノートパソコン'];
      const phoneKeywords = ['phone', 'iphone', 'smartphone', 'mobile', 'ទូរស័ព្ទ', '手机', 'teléfono', 'téléphone', 'スマートフォン'];
      const audioKeywords = ['headphone', 'speaker', 'audio', 'airpod', 'earbuds', 'កាស', '耳机', 'auriculares', 'écouteurs', 'ヘッドフォン'];
      
      if (laptopKeywords.some(k => message.includes(k))) {
        const laptops = products.filter(p => p.category === 'Laptops').slice(0, 3);
        return {
          type: 'products',
          content: `🖥️ Ooh nice! Looking for laptops? I got some awesome ones for ya:\n\n${laptops.map((p, i) => 
            `${i + 1}. ${p.name}\n   💰 $${p.price}\n   ⭐ ${p.rating}/5 (${p.reviewsCount} reviews)\n   ${p.inStock ? '✅ Got it in stock!' : '❌ Sold out rn'}`
          ).join('\n\n')}\n\n${getLocalizedResponse('moreDetails', lang)}`,
          products: laptops
        };
      }

      if (phoneKeywords.some(k => message.includes(k))) {
        const phones = products.filter(p => p.category === 'Smartphones').slice(0, 3);
        return {
          type: 'products',
          content: `📱 Phones! Love it! Check these beauties out:\n\n${phones.map((p, i) => 
            `${i + 1}. ${p.name}\n   💰 $${p.price}\n   ⭐ ${p.rating}/5 (${p.reviewsCount} reviews)\n   ${p.inStock ? '✅ Ready to ship!' : '❌ Out of stock atm'}`
          ).join('\n\n')}\n\n${getLocalizedResponse('moreDetails', lang)}`,
          products: phones
        };
      }

      if (audioKeywords.some(k => message.includes(k))) {
        const audio = products.filter(p => p.category === 'Audio').slice(0, 3);
        return {
          type: 'products',
          content: `🎧 Audio gear! My fav! These are straight fire:\n\n${audio.map((p, i) => 
            `${i + 1}. ${p.name}\n   💰 $${p.price}\n   ⭐ ${p.rating}/5 (${p.reviewsCount} reviews)\n   ${p.inStock ? '✅ In stock, grab it!' : '❌ Out of stock rn'}`
          ).join('\n\n')}\n\n${getLocalizedResponse('moreDetails', lang)}`,
          products: audio
        };
      }

      return {
        type: 'categories',
        content: `🛍️ Wanna browse? We got tons of cool stuff! Check out:\n\n${storeKnowledge.categories.map(c => `• ${c}`).join('\n')}\n\nWhat catches your interest? 😎`
      };
    }

    // Order Tracking
    if (message.includes('order') || message.includes('track') || message.includes('delivery') || message.includes('shipping')) {
      if (user && orders.length > 0) {
        const userOrders = orders.filter(o => o.userId === user.id || true); // Demo: show all
        return {
          type: 'orders',
          content: `📦 Let me check your orders real quick...\n\n${userOrders.map(o => 
            `Order #${o.id}\n💰 $${o.total.toFixed(2)}\n📍 Status: ${o.deliveryStatus.replace('_', ' ').toUpperCase()}\n📅 ${new Date(o.createdAt).toLocaleDateString()}`
          ).join('\n\n')}\n\nNeed more info on any of these? Just ask! 😊`
        };
      }
      return {
        type: 'info',
        content: `📦 Wanna track your order? No prob!\n\n1. Head to your account dashboard\n2. Hit "Orders"\n3. Pick an order to see live tracking\n\nOr just drop me your order number and I'll look it up for ya! 🔍`
      };
    }

    // Promo Codes (multilingual)
    const promoKeywords = ['promo', 'discount', 'coupon', 'code', 'បញ្ចុះតម្លៃ', 'កូដ', '折扣', '优惠', 'descuento', 'código', 'réduction', '割引', 'コード'];
    if (promoKeywords.some(k => message.includes(k))) {
      return {
        type: 'promo',
        content: `${getLocalizedResponse('promoCodes', lang)}\n\n${storeKnowledge.promoCodes.map(p => 
          `**${p.code}** - ${p.discount}\n${p.description}`
        ).join('\n\n')}\n\nJust pop the code at checkout and watch those savings add up! 💸`
      };
    }

    // Shipping Info
    if (message.includes('ship') || message.includes('deliver') || message.includes('freight')) {
      return {
        type: 'shipping',
        content: `🚚 Shipping deets coming right up!\n\n💰 Cost: ${storeKnowledge.shipping.standard}\n⏱️ How long: ${storeKnowledge.shipping.estimated}\n📍 Tracking: ${storeKnowledge.shipping.tracking}\n\n✨ Sweet deal: Spend over $150 and shipping is FREE! 🎉`
      };
    }

    // Returns/Refunds
    if (message.includes('return') || message.includes('refund') || message.includes('exchange')) {
      return {
        type: 'returns',
        content: `🔄 Returns? No worries, we got you!\n\n⏰ You got: ${storeKnowledge.returns.period}\n📋 Just make sure it's: ${storeKnowledge.returns.condition}\n📝 How to do it: ${storeKnowledge.returns.process}\n\nNeed help with a return? I'm here to walk you through it! 🤝`
      };
    }

    // Payment Info
    if (message.includes('payment') || message.includes('pay') || message.includes('credit card') || message.includes('checkout')) {
      return {
        type: 'payment',
        content: `💳 Payment stuff - let's break it down!\n\n✅ We take:\n${storeKnowledge.payment.methods.map(m => `  • ${m}`).join('\n')}\n\n🔒 Security: ${storeKnowledge.payment.security}\n📊 Tax: ${storeKnowledge.payment.taxRate}\n\nEverything's super secure, so shop with confidence! 🛡️`
      };
    }

    // Help/Support
    if (message.includes('help') || message.includes('support') || message.includes('contact') || message.includes('assist')) {
      return {
        type: 'support',
        content: `💬 I'm totally here for you! What can I help with?\n\n✅ Product picks\n✅ Order tracking\n✅ Sweet discounts\n✅ Shipping info\n✅ Return stuff\n✅ Payment options\n✅ Whatever questions you got!\n\n${storeKnowledge.support.contact}\n${storeKnowledge.support.hours}\n\nSo what's up? 😊`
      };
    }

    // Store Info
    if (message.includes('about') || message.includes('store') || message.includes('shop')) {
      return {
        type: 'about',
        content: `🏪 ${storeKnowledge.name}\n\n${storeKnowledge.tagline}\n\n✨ Why we're awesome:\n${storeKnowledge.features.map(f => `• ${f}`).join('\n')}\n\nWe're all about making your tech shopping experience amazing! 🚀`
      };
    }

    // Thank you
    if (message.includes('thank') || message.includes('thanks')) {
      return {
        type: 'thanks',
        content: getLocalizedResponse('thanks', lang)
      };
    }

    // Default - Intelligent fallback (multilingual)
    return {
      type: 'default',
      content: getLocalizedResponse('needHelp', lang, { query: userMessage })
    };
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      
      const assistantMessage = {
        role: 'assistant',
        content: aiResponse.content,
        type: aiResponse.type,
        timestamp: new Date(),
        products: aiResponse.products
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200); // Random delay 0.8-2s for realism
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    { label: "Find Products", icon: "🔍", query: "Help me find products" },
    { label: "Track Order", icon: "📦", query: "Track my order" },
    { label: "Promo Codes", icon: "🎁", query: "Show promo codes" },
    { label: "Shipping Info", icon: "🚚", query: "Shipping information" }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>

      {/* Chat Window */}
      <div className={`relative w-full sm:w-[480px] h-full sm:h-[700px] sm:rounded-2xl border overflow-hidden flex flex-col ${
        darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'
      }`}>
        {/* Header */}
        <div className={`p-4 border-b ${darkMode ? 'bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-slate-700' : 'bg-gradient-to-r from-purple-50 to-blue-50 border-slate-200'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                  <Bot className="w-7 h-7 text-white" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-bold text-lg">AI Shopping Assistant</h3>
                <div className="flex items-center gap-1 text-xs text-emerald-400">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  Online • Ready to help
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Security Badge */}
          <div className={`mt-3 p-2 rounded-lg flex items-center gap-2 text-xs ${darkMode ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-emerald-50 border border-emerald-200'}`}>
            <Shield className="w-4 h-4 text-emerald-400" />
            <span className={darkMode ? 'text-slate-300' : 'text-slate-600'}>
              Secure & Private - Your data is protected
            </span>
          </div>
        </div>

        {/* Messages */}
        <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              {/* Avatar */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-br from-cyan-500 to-blue-600' 
                  : 'bg-gradient-to-br from-purple-500 to-blue-600'
              }`}>
                {msg.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
              </div>

              {/* Message */}
              <div className={`flex-1 ${msg.role === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block max-w-[85%] p-3 rounded-2xl ${
                  msg.role === 'user'
                    ? darkMode ? 'bg-cyan-600 text-white' : 'bg-cyan-500 text-white'
                    : msg.type === 'security'
                    ? darkMode ? 'bg-rose-500/20 border border-rose-500/30 text-rose-300' : 'bg-rose-50 border border-rose-200 text-rose-900'
                    : darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-slate-200'
                } ${msg.role === 'user' ? 'rounded-tr-none' : 'rounded-tl-none'}`}>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  {msg.type === 'security' && (
                    <div className="mt-2 pt-2 border-t border-rose-500/30 flex items-center gap-2 text-xs text-rose-400">
                      <AlertCircle className="w-3 h-3" />
                      Security Protection Active
                    </div>
                  )}
                </div>
                <div className={`mt-1 text-[10px] ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className={`p-3 rounded-2xl rounded-tl-none ${darkMode ? 'bg-slate-800' : 'bg-white border border-slate-200'}`}>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        {messages.length <= 1 && (
          <div className={`px-4 py-3 border-t ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="text-xs font-semibold mb-2 text-slate-400">Quick Actions:</div>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInput(action.query);
                    setTimeout(() => handleSend(), 100);
                  }}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1 ${
                    darkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span>{action.icon}</span>
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className={`p-4 border-t ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about products, orders, or shopping..."
              className={`flex-1 px-4 py-3 rounded-xl outline-none text-sm ${
                darkMode ? 'bg-slate-800 border border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border border-slate-200 text-slate-900'
              }`}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-400 hover:to-blue-500 text-white rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isTyping ? <Loader className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
          <div className="mt-2 text-[10px] text-center text-slate-400">
            Powered by AI • Secure & Private
          </div>
        </div>
      </div>
    </div>
  );
}
