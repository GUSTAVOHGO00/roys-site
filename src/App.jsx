import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

const menuProducts = [
  {
    name: "Steak",
    category: "Linha Chef",
    image: "/assets/steak-hero.webp",
    color: "#ea1f27",
    copy: "Um dos sabores mais marcantes da Linha Chef.",
  },
  {
    name: "Almôndega",
    category: "Linha Chef",
    image: "/assets/almondegas-hero.webp",
    color: "#fabb15",
    copy: "Molho, queijo e uma montagem generosa.",
  },
  {
    name: "Rosbife",
    category: "Linha Chef",
    image: "/assets/rosbife-hero.webp",
    color: "#2789ca",
    copy: "Sabor autoral com personalidade Roy's.",
  },
  {
    name: "Camarão com Cream Cheese",
    category: "Linha Chef",
    image: "/assets/camarao-hero.webp",
    color: "#0767b1",
    copy: "Camarão, cremosidade e muito recheio.",
  },
  {
    name: "Carne Seca com Cream Cheese",
    category: "Linha Chef",
    image: "/assets/carne-seca-hero.webp",
    color: "#ea1f27",
    copy: "Carne seca e cream cheese em uma combinação intensa.",
  },
  {
    name: "Choripán",
    category: "Linha Chef",
    image: "/assets/choripan-hero.webp",
    imagePosition: "center 48%",
    color: "#fabb15",
    copy: "Um sabor da Linha Chef que foge do óbvio.",
  },
  {
    name: "Frango",
    category: "Clássicos",
    image: "/assets/frango-hero.webp",
    color: "#2789ca",
    copy: "O clássico direto ao ponto para qualquer hora.",
  },
  {
    name: "Frango com Cream Cheese",
    category: "Clássicos",
    image: "/assets/frango-com-cream-cheese-hero.webp",
    color: "#fabb15",
    copy: "Frango bem servido com cremosidade na medida.",
  },
  {
    name: "Frango Crispy King",
    category: "Clássicos",
    image: "/assets/frango-crispy-king-hero.webp",
    imagePosition: "68% center",
    color: "#ea1f27",
    copy: "Crocância e recheio em uma combinação clássica.",
  },
  {
    name: "Frango Crispy Royal",
    category: "Clássicos",
    image: "/assets/frango-crispy-royal-hero.webp",
    imagePosition: "center 54%",
    color: "#0767b1",
    copy: "Mais uma opção crispy para escolher do seu jeito.",
  },
  {
    name: "Smash Blend",
    category: "Clássicos",
    image: "/assets/smash-blend-hero.webp",
    color: "#ea1f27",
    copy: "Carne estilo smash no formato comprido de um sub Roy's.",
  },
];

const builderOptions = [
  {
    key: "base",
    title: "Ponto de partida",
    options: [
      "Frango",
      "Frango crispy",
      "Steak",
      "Rosbife",
      "Camarão",
      "Carne seca",
      "Almôndega",
      "Choripán",
      "Smash Blend",
    ],
  },
  {
    key: "tamanho",
    title: "Tamanho",
    options: ["Smart 15 cm", "Super 30 cm"],
  },
  {
    key: "pao",
    title: "Pão",
    options: ["Parmesão & Orégano", "Brioche", "Multigrãos", "Três Queijos"],
  },
  {
    key: "queijo",
    title: "Queijo",
    options: ["Mussarela", "Coalho", "Cheddar"],
  },
  {
    key: "vegetais",
    title: "Vegetais",
    multiple: true,
    limit: 4,
    options: ["Alface", "Tomate", "Rúcula", "Cebola roxa", "Cenoura", "Pepino", "Azeitona preta"],
  },
  {
    key: "molhos",
    title: "Molhos",
    multiple: true,
    limit: 2,
    options: ["Roy's Especial", "Aioli", "Chipotle", "Mostarda e Mel", "Parmesão", "Barbecue", "Ketchup Defumado"],
  },
  {
    key: "adicionais",
    title: "Toque final",
    multiple: true,
    optional: true,
    limit: 2,
    options: ["Sem adicional", "Bacon", "Cream cheese", "Cebola crispy", "Geleia de pimenta", "Chutney de abacaxi"],
  },
];

const builderProfiles = [
  ["O Clássico", "Você foi por um caminho conhecido, bem pedido e difícil de errar."],
  ["Queridinho da Galera", "Essa combinação tem cara de favorita: familiar, recheada e muito fácil de amar."],
  ["Cremoso sem Medo", "Você não economizou na cremosidade. Guardanapo por perto e felicidade garantida."],
  ["Recheio é Prioridade", "Discrição não entrou nesse pedido. Seu Roy's chega para ocupar espaço."],
  ["Equilíbrio Perfeito", "Frescor, textura e sabor dividiram o protagonismo sem brigar entre si."],
  ["Verde no Capricho", "Você montou um sub colorido, fresco e ainda assim com presença."],
  ["Molho é Tudo", "Para você, o molho não acompanha: ele assina a combinação."],
  ["Minimalista Convicto", "Poucas escolhas, todas certeiras. Você sabe exatamente o que quer."],
  ["Fora da Curva", "Essa mistura não aparece todo dia. Diferente, ousada e com personalidade."],
  ["Caramba, Esse é Diferente!", "Você juntou escolhas improváveis e criou um Roy's que merece entrar em teste."],
];

const locations = [
  {
    name: "Shopping da Ilha",
    maps: "https://www.google.com/maps/search/?api=1&query=Shopping+da+Ilha+Sao+Luis+MA",
    ifood:
      "https://www.ifood.com.br/delivery/sao-luis-ma/roys--shopping-da-ilha-maranhao-novo/74329ee3-3ae2-4fa2-a4bc-eed5d20f6d7f",
  },
  {
    name: "Shopping Rio Anil",
    maps: "https://www.google.com/maps/search/?api=1&query=Shopping+Rio+Anil+Sao+Luis+MA",
    ifood:
      "https://www.ifood.com.br/delivery/sao-luis-ma/roys-sandwich-shop-turu/ddcb6d2e-8f03-4e4a-b4c0-30a46f292bc7",
  },
];

const whatsappUrl =
  "https://wa.me/5598991289090?text=Ol%C3%A1%2C%20Roy%27s!%20Gostaria%20de%20falar%20com%20voc%C3%AAs.";

function Arrow({ diagonal = false }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {diagonal ? <path d="M7 17 17 7M8 7h9v9" /> : <path d="M4 12h16m-6-6 6 6-6 6" />}
    </svg>
  );
}

function Crown({ className = "" }) {
  return <img className={className} src="/assets/crown-official.png" alt="" />;
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.4 3.6A11.7 11.7 0 0 0 2 17.7L.5 23.5l5.9-1.4A11.7 11.7 0 0 0 20.4 3.6Z" />
      <path d="M8.2 6.9c.3-.7.6-.7 1-.7h.7c.2 0 .4.1.5.4l1 2.4c.1.3.1.5-.1.8l-.8 1c-.2.2-.3.4-.1.7.8 1.6 2.1 2.9 3.7 3.7.3.2.5.1.7-.1l1-1.2c.2-.3.5-.3.8-.2l2.5 1.2c.3.1.4.3.4.5 0 .5-.2 1.8-1.1 2.5-.8.7-1.9 1-3.1.7-1.2-.3-3.3-1.1-5.6-3.1-1.8-1.6-3-3.5-3.4-4.8-.4-1.2 0-2.8.5-3.8Z" />
    </svg>
  );
}

function WhatsAppContact() {
  return (
    <a
      className="whatsapp-float"
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Fale conosco pelo WhatsApp: (98) 99128-9090"
    >
      <i><WhatsAppIcon /></i>
      <span>
        <strong>Fale conosco</strong>
      </span>
    </a>
  );
}

function Button({ children, onClick, className = "", as = "button", href, disabled = false }) {
  const Comp = as;
  return (
    <Comp className={`action ${className}`} onClick={onClick} href={href} disabled={disabled}>
      <span>{children}</span>
      <i>
        <Arrow />
      </i>
    </Comp>
  );
}

function Header({ onOrder }) {
  const [open, setOpen] = useState(false);
  const leftLinks = [
    ["Sabores", "#sabores"],
    ["Quem somos", "#quem-somos"],
  ];
  const rightLinks = [
    ["Monte o seu", "#monte-o-seu"],
    ["Saladas", "#saladas"],
    ["Lojas", "#lojas"],
  ];

  return (
    <header className="nav-shell">
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <nav className={open ? "nav-links open" : "nav-links"} aria-label="Navegação principal">
        <div>
          {leftLinks.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </div>
        <a className="nav-logo" href="#inicio" aria-label="Roy's, início">
          <img src="/assets/logo-primary-transparent.png" alt="Roy's Sandwich Shop" />
        </a>
        <div>
          {rightLinks.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </div>
      </nav>
      <button className="nav-cta" onClick={onOrder}>
        Pedir <Arrow />
      </button>
      <button
        className="nav-toggle"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
      </button>
    </header>
  );
}

function Hero({ onOrder }) {
  const heroRef = useRef(null);
  const [activePhoto, setActivePhoto] = useState(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -70]);
  const heroPhotos = [
    { src: "/assets/steak-hero.webp", position: "center" },
    { src: "/assets/frango-com-cream-cheese-hero.webp", position: "center" },
    { src: "/assets/camarao-hero.webp", position: "center" },
  ];

  useEffect(() => {
    if (reduceMotion) return undefined;
    const timer = window.setInterval(
      () => setActivePhoto((current) => (current + 1) % heroPhotos.length),
      4200,
    );
    return () => window.clearInterval(timer);
  }, [reduceMotion, heroPhotos.length]);

  return (
    <section ref={heroRef} className="hero-v3" id="inicio">
      <div className="hero-grid" aria-hidden="true" />
      <motion.div className="hero-word hero-word-top" style={{ y: titleY }}>
        SABOR
      </motion.div>
      <motion.div className="hero-word hero-word-bottom" style={{ y: titleY }}>
        ROY&apos;S
      </motion.div>

      <div className="hero-message">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="kicker">
          Subs artesanais • Feitos na hora
        </motion.p>
        <h1>
          Muito recheio.
          <br />
          Muitas escolhas.
          <br />
          <em>Muito Roy&apos;s.</em>
        </h1>
        <p>Subs artesanais e saladas bem servidas, preparados na hora com ingredientes frescos e muito recheio.</p>
        <Button onClick={onOrder} className="hero-action">
          Pedir meu Roy&apos;s
        </Button>
      </div>

      <div className="hero-product-stage" aria-label="Seleção de subs artesanais Roy's">
        <AnimatePresence initial={false}>
          <motion.img
            key={heroPhotos[activePhoto].src}
            src={heroPhotos[activePhoto].src}
            alt=""
            style={{ objectPosition: heroPhotos[activePhoto].position }}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: reduceMotion ? 1 : 1.015 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 0.9 }, scale: { duration: 4.2, ease: "linear" } }}
          />
        </AnimatePresence>
        <div className="hero-photo-wash" />
        <div className="hero-photo-index">
          {heroPhotos.map((photo, index) => (
            <button
              key={photo.src}
              aria-label={`Ver imagem ${index + 1}`}
              className={activePhoto === index ? "active" : ""}
              onClick={() => setActivePhoto(index)}
            />
          ))}
        </div>
      </div>

      <div className="hero-proof">
        <span>Smart 15 cm</span>
        <Crown />
        <span>Super 30 cm</span>
      </div>

    </section>
  );
}

function MenuGallery({ onOrder }) {
  const [filter, setFilter] = useState("Todos");
  const [selected, setSelected] = useState(menuProducts[0]);
  const visible =
    filter === "Todos" ? menuProducts : menuProducts.filter((item) => item.category === filter);

  return (
    <section className="menu-gallery" id="sabores">
      <div className="menu-heading">
        <div>
          <p className="kicker blue">Todos os nossos subs</p>
          <h2>
            Encontre seu
            <br />
            próximo Roy&apos;s.
          </h2>
        </div>
        <div className="menu-heading-side">
          <p>
            Onze sabores entre Linha Chef e Clássicos. Escolha pelo nome, descubra pela foto e
            peça na sua unidade.
          </p>
          <div className="menu-filters" role="group" aria-label="Filtrar cardápio">
            {["Todos", "Linha Chef", "Clássicos"].map((category) => (
              <button
                key={category}
                className={filter === category ? "active" : ""}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="menu-layout">
        <div className="menu-list">
          {visible.map((item, index) => (
            <button
              key={item.name}
              className={selected.name === item.name ? "active" : ""}
              onClick={() => setSelected(item)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.name}</strong>
              <small>{item.category}</small>
              <Arrow diagonal />
            </button>
          ))}
        </div>

        <motion.aside
          className={`menu-feature ${selected.image ? "" : "no-photo"}`}
          style={{ "--feature-color": selected.color }}
          key={selected.name}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {selected.image ? (
            <img
              src={selected.image}
              alt={`Sub ${selected.name} da Roy's`}
              style={{ objectPosition: selected.imagePosition || "center" }}
            />
          ) : (
            <div className="photo-coming">
              <Crown />
              <span>Foto oficial</span>
              <strong>em breve</strong>
            </div>
          )}
          <div className="menu-feature-copy">
            <span>{selected.category}</span>
            <h3>{selected.name}</h3>
            <p>{selected.copy}</p>
            <Button onClick={onOrder} className="compact">
              Quero provar
            </Button>
          </div>
        </motion.aside>
      </div>

      <div className="menu-note">
        <Crown />
        <p>
          Todos disponíveis nos tamanhos <strong>Smart 15 cm</strong> e <strong>Super 30 cm</strong>.
          A disponibilidade pode variar por unidade.
        </p>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="manifesto" id="quem-somos">
      <div className="manifesto-photo">
        <motion.img
          src="/assets/person-presenting-02.webp"
          alt="Pessoa apresentando um sub da Roy's"
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
        <div className="manifesto-sticker">
          <Crown />
          <span>Feito na hora</span>
          <strong>do seu jeito</strong>
        </div>
      </div>
      <div className="manifesto-copy">
        <p className="kicker">Quem somos</p>
        <h2>
          Rápido no preparo.
          <br />
          <em>Sem pressa no sabor.</em>
        </h2>
        <div className="manifesto-columns">
          <p>
            Somos uma rede brasileira de subs artesanais e saladas bem servidas, feita para quem
            quer praticidade sem abrir mão de comida de verdade.
          </p>
          <p>
            Cada pedido é montado na hora, com ingredientes frescos, combinações autorais, recheio
            generoso e liberdade para você escolher.
          </p>
        </div>
        <div className="manifesto-proof">
          <span>Não é comida sem graça.</span>
          <span>Não é pedido engessado.</span>
          <span>É Roy&apos;s, do seu jeito.</span>
        </div>
      </div>
    </section>
  );
}

function Builder({ onOrder }) {
  const [choices, setChoices] = useState({});
  const [result, setResult] = useState(null);
  const requiredGroups = builderOptions.filter((group) => !group.optional);
  const completed = requiredGroups.filter((group) => {
    const value = choices[group.key];
    return Array.isArray(value) ? value.length > 0 : Boolean(value);
  }).length;
  const progress = (completed / requiredGroups.length) * 100;

  const selectChoice = (group, option) => {
    setResult(null);
    setChoices((current) => {
      if (!group.multiple) return { ...current, [group.key]: option };
      if (option === "Sem adicional") return { ...current, [group.key]: [option] };
      const previous = (current[group.key] || []).filter((item) => item !== "Sem adicional");
      const next = previous.includes(option)
        ? previous.filter((item) => item !== option)
        : [...previous, option].slice(-group.limit);
      return { ...current, [group.key]: next };
    });
  };

  const revealProfile = () => {
    if (completed !== requiredGroups.length) return;
    const vegetables = choices.vegetais || [];
    const sauces = choices.molhos || [];
    const additions = choices.adicionais || [];
    let profileIndex = 0;
    if (additions.includes("Cream cheese") && sauces.length === 2) profileIndex = 2;
    else if (vegetables.length >= 4) profileIndex = 5;
    else if (sauces.length === 2) profileIndex = 6;
    else if (vegetables.length <= 1 && additions.includes("Sem adicional")) profileIndex = 7;
    else if (additions.includes("Geleia de pimenta") || additions.includes("Chutney de abacaxi")) profileIndex = 9;
    else if (additions.length >= 2) profileIndex = 3;
    else {
      const signature = Object.values(choices).flat().join("").length;
      profileIndex = [0, 1, 4, 8][signature % 4];
    }
    setResult(builderProfiles[profileIndex]);
  };

  return (
    <section className="builder" id="monte-o-seu">
      <div className="builder-top">
        <div>
          <p className="kicker">Modo capricho</p>
          <h2>
            Monte sua
            <br />
            combinação.
          </h2>
        </div>
        <div className="builder-progress">
          <span>{completed}/{requiredGroups.length} etapas principais</span>
          <div>
            <motion.i animate={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="builder-game">
        <div className="builder-choices">
          {builderOptions.map((group, index) => (
            <article key={group.key} className={choices[group.key] ? "chosen" : ""}>
              <span>0{index + 1}</span>
              <h3>{group.title}</h3>
              <div>
                {group.options.map((option) => (
                  <button
                    key={option}
                    data-testid={`builder-${group.key}-${option}`}
                    aria-pressed={
                      Array.isArray(choices[group.key])
                        ? choices[group.key].includes(option)
                        : choices[group.key] === option
                    }
                    className={
                      (Array.isArray(choices[group.key])
                        ? choices[group.key].includes(option)
                        : choices[group.key] === option)
                        ? "active"
                        : ""
                    }
                    onClick={() => selectChoice(group, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>

        <motion.aside
          className="builder-ticket"
          animate={{ rotate: result ? -2 : 2 }}
          transition={{ type: "spring", stiffness: 180 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              className="builder-result-head"
              key={result ? result[0] : "building"}
              initial={{ opacity: 0, scale: 0.85, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <Crown className={result ? "result-crown" : ""} />
              <p>{result ? "Seu perfil Roy's" : "Seu Roy's"}</p>
              <h3>{result ? result[0] : completed === requiredGroups.length ? "Descubra seu perfil." : "Comece escolhendo."}</h3>
              {result && <strong>{result[1]}</strong>}
            </motion.div>
          </AnimatePresence>
          <ul>
            {builderOptions.map((group) => (
              <li key={group.key}>
                <span>{group.title}</span>
                <strong>
                  {Array.isArray(choices[group.key])
                    ? choices[group.key].join(", ") || "—"
                    : choices[group.key] || "—"}
                </strong>
              </li>
            ))}
          </ul>
          <Button
            onClick={result ? onOrder : revealProfile}
            disabled={!result && completed !== requiredGroups.length}
            className={completed === requiredGroups.length ? "" : "muted"}
          >
            {result ? "Pedir meu Roy's" : "Revelar meu perfil"}
          </Button>
          {result && (
            <button className="builder-reset" onClick={() => { setChoices({}); setResult(null); }}>
              Montar outra combinação
            </button>
          )}
          <small>Uma brincadeira para explorar combinações. Itens e disponibilidade podem variar por unidade.</small>
        </motion.aside>
      </div>
    </section>
  );
}

function Salads({ onOrder }) {
  return (
    <section className="salad-world" id="saladas">
      <div className="salad-orbit orbit-one" />
      <div className="salad-orbit orbit-two" />
      <div className="salad-copy">
        <p className="kicker">Saladas bem servidas</p>
        <h2>
          Salada é
          <br />
          <em>prato principal.</em>
        </h2>
        <p>
          Completa, colorida e feita para sustentar uma refeição de verdade. Aqui, leveza não
          significa pouca comida.
        </p>
        <div className="salad-tags">
          <span>Steak</span>
          <span>Frango</span>
          <span>Camarão</span>
          <span>Italiana</span>
        </div>
        <Button onClick={onOrder}>Conhecer as saladas</Button>
      </div>
      <motion.div
        className="salad-circle"
        tabIndex={0}
        aria-label="Foto da Salada Steak Roy's"
        initial={{ rotate: -8, scale: 0.9 }}
        whileInView={{ rotate: 3, scale: 1 }}
        whileHover={{ rotate: 0, scale: 1.035, x: -24 }}
        whileFocus={{ rotate: 0, scale: 1.035, x: -24 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <img src="/assets/steak-salad-vertical.webp" alt="Salada Steak Roy's bem servida" />
      </motion.div>
      <div className="salad-note">
        <strong>Mais fresca.</strong>
        <strong>Mais recheada.</strong>
        <strong>Mais Roy&apos;s.</strong>
      </div>
    </section>
  );
}

function Locations({ onOrder }) {
  return (
    <section className="stores" id="lojas">
      <div className="stores-title">
        <p className="kicker blue">São Luís, MA</p>
        <h2>
          Tem Roy&apos;s
          <br />
          perto de você.
        </h2>
      </div>
      <div className="store-cards">
        {locations.map((location, index) => (
          <article key={location.name}>
            <span>Unidade 0{index + 1}</span>
            <h3>{location.name}</h3>
            <p>Segunda a sábado, 10h às 22h<br />Domingo, 12h às 22h</p>
            <div>
              <a href={location.maps} target="_blank" rel="noreferrer">
                Ver no mapa <Arrow diagonal />
              </a>
              {location.ifood ? (
                <a href={location.ifood} target="_blank" rel="noreferrer">
                  Pedir no iFood <Arrow diagonal />
                </a>
              ) : (
                <button onClick={onOrder}>
                  Ver pedidos <Arrow diagonal />
                </button>
              )}
            </div>
            <Crown />
          </article>
        ))}
      </div>
    </section>
  );
}

function OrderDialog({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const closeOnEscape = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="dialog-layer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => event.target === event.currentTarget && onClose()}
        >
          <motion.div
            className="order-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-title"
            initial={{ y: 60, opacity: 0, rotate: 2 }}
            animate={{ y: 0, opacity: 1, rotate: -1 }}
            exit={{ y: 40, opacity: 0 }}
          >
            <button className="dialog-x" onClick={onClose} aria-label="Fechar">
              ×
            </button>
            <Crown />
            <p className="kicker">Escolha sua unidade</p>
            <h2 id="order-title">A fome decidiu. Agora falta a loja.</h2>
            {locations.map((location) => (
              <a key={location.name} href={location.ifood} target="_blank" rel="noreferrer">
                <span>{location.name}</span>
                <strong>Pedir no iFood</strong>
                <Arrow />
              </a>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Footer({ onOrder }) {
  return (
    <footer className="footer-v3">
      <Crown />
      <h2>
        Mais sabor.
        <br />
        Mais verdade.
        <br />
        <em>Mais Roy&apos;s.</em>
      </h2>
      <Button onClick={onOrder}>Pedir agora</Button>
      <div>
        <img src="/assets/logo-primary-transparent.png" alt="Roy's Sandwich Shop" />
        <a href="https://www.instagram.com/roysbrasil/" target="_blank" rel="noreferrer">
          @roysbrasil
        </a>
        <a href={whatsappUrl} target="_blank" rel="noreferrer">
          Fale conosco: (98) 99128-9090
        </a>
        <span>© {new Date().getFullYear()} Roy&apos;s</span>
      </div>
    </footer>
  );
}

export default function App() {
  const [orderOpen, setOrderOpen] = useState(false);

  return (
    <>
      <Header onOrder={() => setOrderOpen(true)} />
      <main id="conteudo">
        <Hero onOrder={() => setOrderOpen(true)} />
        <MenuGallery onOrder={() => setOrderOpen(true)} />
        <Manifesto />
        <Builder onOrder={() => setOrderOpen(true)} />
        <Salads onOrder={() => setOrderOpen(true)} />
        <Locations onOrder={() => setOrderOpen(true)} />
      </main>
      <Footer onOrder={() => setOrderOpen(true)} />
      <OrderDialog open={orderOpen} onClose={() => setOrderOpen(false)} />
      <WhatsAppContact />
    </>
  );
}
