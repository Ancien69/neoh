import { useState } from 'react';
import { ChevronRight, MessageCircle, Clock, BookOpen, UserPlus, ArrowLeft, FileText, Phone, X } from 'lucide-react';

interface AISPageProps {
  onBack: () => void;
  onCandidater: () => void;
}

const aisModules = {
  1: [
    { title: "Accueil, positionnement et méthode de travail NEOH", domain: "Méthodologie professionnelle", description: "Présenter le fonctionnement de la formation, les méthodes de travail attendues, les outils utilisés et évaluer le niveau de départ des apprenants afin d'adapter l'accompagnement.", hours: 2 },
    { title: "Les attentes du titre AIS", domain: "Projet / Évaluation", description: "Comprendre les objectifs du titre professionnel AIS, les compétences visées, les modalités d'évaluation, le dossier professionnel et les attendus de la certification.", hours: 2 },
    { title: "Gestion des incidents, SLA et maintien en condition opérationnelle", domain: "ITSM", description: "Apprendre à exploiter une infrastructure au quotidien en traitant les incidents de niveau 2 et plus, en suivant les SLA, en documentant les interventions et en appliquant les bonnes pratiques ITSM / ITIL pour maintenir les services opérationnels.", hours: 31 },
    { title: "Administration avancée des réseaux sécurisés d'entreprise", domain: "Réseaux", description: "Administrer, sécuriser et dépanner une infrastructure réseau d'entreprise avec VLAN, routage, redondance, VPN, Wi-Fi, pare-feu, proxy, IDS/IPS, QoS, supervision réseau et documentation technique.", hours: 70 },
    { title: "Administration sécurisée des systèmes hybrides Windows, Linux et Cloud", domain: "Systèmes", description: "Administrer et sécuriser des serveurs Windows et Linux, les services DNS/DHCP, Active Directory, Azure AD, Microsoft 365, les certificats, la PKI, les accès sécurisés, les sauvegardes, les mises à jour et les scripts d'administration.", hours: 70 },
    { title: "Virtualisation, cloud hybride et conteneurisation avec Docker", domain: "Virtualisation", description: "Administrer des environnements virtualisés et cloud, gérer les VM, le stockage, les réseaux virtuels, les sauvegardes, les migrations cloud, les conteneurs Docker et les premières notions d'orchestration et de consommation à l'usage.", hours: 70 },
    { title: "Conception d'architecture IT sécurisée et choix de solutions", domain: "Projet", description: "Analyser un besoin d'évolution, comparer plusieurs solutions techniques, réaliser une maquette, évaluer les impacts sur le SI, intégrer la sécurité dès la conception et présenter une proposition argumentée.", hours: 35 },
    { title: "Mise en production et continuité de service (PRA/PCA)", domain: "Projet", description: "Préparer et piloter la mise en production d'une solution en limitant l'impact sur le SI, en appliquant les bonnes pratiques ITIL, en validant les procédures de continuité, de reprise et de transfert vers l'exploitation.", hours: 35 },
    { title: "Supervision IT : indicateurs, alertes et tableaux de bord", domain: "ITSM", description: "Mettre en place une supervision d'infrastructure, définir les indicateurs à suivre, configurer les seuils d'alerte, exploiter les journaux d'événements et produire des tableaux de bord de suivi de production.", hours: 35 },
    { title: "Audit cybersécurité, analyse des risques et vulnérabilités", domain: "Cybersécurité", description: "Identifier les menaces, analyser les risques, évaluer les vulnérabilités, réaliser un audit de sécurité interne, utiliser des outils de test contrôlés et exploiter les référentiels comme EBIOS, ISO 27005, CVE et CWE.", hours: 35 },
    { title: "Protection du SI : Zero Trust, EDR, sauvegardes et sensibilisation", domain: "Cybersécurité", description: "Mettre en œuvre des mesures concrètes de sécurisation du SI : gestion des accès, MFA, Zero Trust, durcissement système, chiffrement, VPN, sauvegardes, haute disponibilité, solutions EDR/XDR/SIEM et sensibilisation des utilisateurs.", hours: 35 },
    { title: "SIEM : Détection et réponse aux incidents cybersécurité", domain: "Cybersécurité", description: "Configurer et exploiter un dispositif de détection comme un SIEM, SOAR ou XDR, qualifier les incidents de sécurité, préserver les traces, transmettre les informations aux équipes concernées et participer au RETEX après incident.", hours: 35 },
  ]
};

const domainColors: { [key: string]: string } = {
  "Réseaux": "bg-blue-100 text-blue-700",
  "Systèmes": "bg-indigo-100 text-indigo-700",
  "Cybersécurité": "bg-red-100 text-red-700",
  "ITSM": "bg-green-100 text-green-700",
  "Virtualisation": "bg-purple-100 text-purple-700",
  "Projet": "bg-yellow-100 text-yellow-700",
  "Méthodologie professionnelle": "bg-slate-100 text-slate-700",
  "Projet / Évaluation": "bg-yellow-100 text-yellow-700",
};

export default function AISPage({ onBack, onCandidater }: AISPageProps) {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', situation: '' });
  const [accepted, setAccepted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [isRecontactOpen, setIsRecontactOpen] = useState(false);
  const [recontactSubmitted, setRecontactSubmitted] = useState(false);
const [recontactData, setRecontactData] = useState({
  firstName: '', lastName: '', email: '', phone: '',
  sujet: '', formation: '', moment: '', message: ''
});
const [recontactAccepted, setRecontactAccepted] = useState(false);

const handleRecontactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  setRecontactData({ ...recontactData, [e.target.name]: e.target.value });
};

const handleRecontactSubmit = () => {
  if (!recontactAccepted) {
    alert('Veuillez accepter la politique de confidentialité');
    return;
  }
  // TODO : envoyer les données
  setRecontactSubmitted(true);
};
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'Le prénom est requis';
    if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est requis';
    if (!formData.email.trim()) newErrors.email = "L'email est requis";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email invalide';
    if (!formData.phone.trim()) newErrors.phone = 'Le téléphone est requis';
    else if (!/^[0-9+\s().-]{6,20}$/.test(formData.phone)) newErrors.phone = 'Numéro invalide';
    if (!formData.situation) newErrors.situation = 'Veuillez sélectionner votre situation';
    if (!accepted) newErrors.accepted = 'Vous devez accepter la politique de confidentialité';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Bar retour */}
      <div className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </button>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-[1fr_400px] gap-10 items-start">
          <div>
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="bg-white/15 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full">BAC+3 — NIVEAU 6</span>
              <span className="bg-slate-900/40 backdrop-blur-sm border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full">RNCP 37680</span>
              <span className="bg-white/15 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full">ALTERNANCE </span>
              <span className="bg-slate-900/40 backdrop-blur-sm border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full">100% À DISTANCE</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2 leading-tight">Devenez</h1>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Administrateur(rice)<br />d'Infrastructures Sécurisées</h2>
            <div className="space-y-4">
  <p>
    Le parcours <strong>Administrateur d'Infrastructures Sécurisées</strong> de
    NEOH prépare aux métiers de l'administration systèmes et réseaux, de
    l'exploitation cloud, de la cybersécurité opérationnelle et de la gestion
    d'infrastructures hybrides.
  </p>
  <p>
    Cette formation s'adresse aux étudiants, alternants, techniciens IT ou
    personnes en reconversion souhaitant évoluer vers un niveau supérieur
    d'autonomie technique.
  </p>
  <p>
    Chez NEOH, vous apprenez à administrer, sécuriser, superviser et faire
    évoluer des infrastructures modernes : réseaux d'entreprise, serveurs
    Windows et Linux, Active Directory, cloud Azure et AWS, virtualisation,
    Docker, supervision, SIEM, sécurité des accès, PRA/PCA et réponse aux
    incidents cyber.
  </p>
  <p>
    <strong>Une formation à distance, orientée pratique, avec des labs techniques, des
    projets d'infrastructure et des mises en situation proches de l'entreprise.</strong>
  </p>
</div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/20">
              <div><p className="text-3xl font-bold">12</p><p className="text-white/70 text-sm">MOIS</p></div>
              <div><p className="text-3xl font-bold">455h</p><p className="text-white/70 text-sm">DE COURS EN DISTANCIEL</p></div>
              <div><p className="text-3xl font-bold">2/3</p><p className="text-white/70 text-sm">EN ENTREPRISE</p></div>
              <div><p className="text-3xl font-bold">0€</p><p className="text-white/70 text-sm">FRAIS DOSSIER</p></div>
            </div>
<div className="flex flex-col sm:flex-row gap-4 mt-8">
  <button onClick={onCandidater}
    className="bg-white text-indigo-600 hover:bg-slate-100 px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
    <FileText className="w-5 h-5" />
    Candidater
  </button>
  <button onClick={() => setIsRecontactOpen(true)}
    className="bg-indigo-800 hover:bg-indigo-900 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
    <Phone className="w-5 h-5" />
    Être recontacté
  </button>
</div>
          </div>

          {/* Formulaire */}
          <div className="bg-white rounded-2xl shadow-2xl p-7 lg:sticky lg:top-6">
            {submitted ? (
              <div className="text-center py-8">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Demande envoyée !</h3>
                <p className="text-slate-600 text-sm">Un conseiller vous recontactera sous 48h.</p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Recevoir le programme complet</h3>
                <p className="text-slate-500 text-sm mb-6">Un conseiller vous rappelle sous 48h — sans engagement.</p>
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {[
                    { name: 'firstName', label: 'Prénom', type: 'text', placeholder: 'Votre prénom' },
                    { name: 'lastName', label: 'Nom', type: 'text', placeholder: 'Votre nom' },
                    { name: 'email', label: 'Email', type: 'email', placeholder: 'votre@email.com' },
                    { name: 'phone', label: 'Téléphone', type: 'tel', placeholder: '06 00 00 00 00' },
                  ].map(({ name, label, type, placeholder }) => (
                    <div key={name}>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">{label}</label>
                      <input type={type} name={name} value={formData[name as keyof typeof formData]} onChange={handleChange} placeholder={placeholder}
                       className={`w-full px-4 py-3 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-slate-900 placeholder:text-slate-400 ${errors[name] ? 'border-red-400' : 'border-slate-200'}`} />
                      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Situation</label>
                    <select name="situation" value={formData.situation} onChange={handleChange}
                      className={`w-full px-4 py-3 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-slate-700 ${errors.situation ? 'border-red-400' : 'border-slate-200'}`}>
                      <option value="">Sélectionnez</option>
                      <option value="etudiant">Étudiant(e)</option>
                      <option value="demandeur">Demandeur d'emploi</option>
                      <option value="salarie">Salarié(e)</option>
                      <option value="reconversion">En reconversion</option>
                    </select>
                    {errors.situation && <p className="text-red-500 text-xs mt-1">{errors.situation}</p>}
                  </div>
                  <div className="flex items-start gap-2 pt-1">
                    <input type="checkbox" id="rgpd-ais" checked={accepted} onChange={(e) => { setAccepted(e.target.checked); if (errors.accepted) setErrors({ ...errors, accepted: '' }); }} className="mt-1 accent-indigo-600" />
                    <label htmlFor="rgpd-ais" className="text-xs text-slate-500 leading-relaxed">J'accepte que mes données soient utilisées par NEOH conformément au RGPD.</label>
                  </div>
                  {errors.accepted && <p className="text-red-500 text-xs">{errors.accepted}</p>}
                  <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-lg font-bold transition-colors mt-2">ENVOYER MA DEMANDE</button>
                  <p className="text-center text-xs text-slate-400">Résultats sous 30 jours · Sans engagement</p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Niveaux */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 text-center shadow-sm">
            <p className="text-slate-500 text-sm mb-1">Niveau d'études requis</p>
            <p className="text-3xl font-bold text-slate-800">Niveau 5</p>
            <p className="text-slate-500 text-sm mt-1">Bac+2</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-center shadow-sm">
            <p className="text-purple-600 text-sm mb-1">Niveau en sortie</p>
            <p className="text-3xl font-bold text-purple-700">Niveau 6</p>
            <p className="text-purple-500 text-sm mt-1">Bac+3 / Licence</p>
          </div>
        </div>
      </section>
{/* Section : Ce que vous saurez faire — AIS */}
<section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-16">
  <div className="max-w-5xl mx-auto px-6">
    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
      Ce que vous saurez faire à l'issue de la formation
    </h2>
    <p className="text-white/90 mb-8 max-w-3xl">
      À la fin du parcours AIS, vous serez capable d'intervenir sur des
      infrastructures plus complexes, en tenant compte des enjeux de
      disponibilité, sécurité, supervision, cloud et continuité de service.
    </p>
    <p className="font-semibold mb-4">Vous apprendrez notamment à :</p>
    <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
      {[
        "Administrer et sécuriser des réseaux d'entreprise",
        "Configurer des VLAN, VPN, pare-feux, QoS et solutions de haute disponibilité réseau",
        "Administrer des serveurs Windows, Linux et des services d'infrastructure",
        "Gérer Active Directory, Entra ID, Microsoft 365 et les identités hybrides",
        "Administrer des environnements virtualisés et cloud",
        "Utiliser Azure, AWS, Docker et les bases de la conteneurisation",
        "Mettre en place des sauvegardes, restaurations et plans de continuité",
        "Superviser une infrastructure avec indicateurs, alertes, logs et tableaux de bord",
        "Analyser les risques et vulnérabilités d'une infrastructure",
        "Appliquer des mesures de cybersécurité : Zero Trust, MFA, EDR, durcissement, sauvegardes",
        "Utiliser un SIEM pour détecter et traiter des incidents de sécurité",
        "Concevoir une solution technique et la présenter de manière argumentée",
        "Produire des livrables professionnels : procédures, schémas, rapports, dossiers projets et supports de présentation",
      ].map((item) => (
        <li key={item} className="flex items-start gap-3">
         <span className="text-white/90">{item}</span>
        </li>
      ))}
    </ul>
  </div>
</section>
      {/* Programme */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-medium flex items-center gap-2"><Clock className="w-4 h-4" />455h de formation en Distanciel</span>
            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium flex items-center gap-2"><BookOpen className="w-4 h-4" />2/3 en entreprise</span>
            <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-medium flex items-center gap-2"><UserPlus className="w-4 h-4" />En alternance</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Programme de la formation</h2>
          <p className="text-slate-500 mb-8">12 modules sur 12 mois de formation en alternance.</p>

          {/* Onglet unique Année 1 */}
          <div className="flex gap-2 mb-8">
            <div className="px-6 py-3 rounded-lg font-semibold bg-indigo-600 text-white shadow-md">
              Année 1
              <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-white/20">
                {aisModules[1].length} modules
              </span>
            </div>
          </div>

          {/* Cartes modules */}
          <div className="grid gap-4">
            {aisModules[1].map((module, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-sm transition-all">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="font-bold text-slate-800 leading-snug">{module.title}</h3>
                  <span className="text-indigo-600 font-bold text-sm whitespace-nowrap">{module.hours}h</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${domainColors[module.domain] || 'bg-slate-100 text-slate-600'}`}>
                    {module.domain}
                  </span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{module.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-purple-50 border-l-4 border-purple-500 rounded-r-xl p-5">
            <p className="text-purple-800 leading-relaxed text-sm">
              L'AIS correspond davantage à des profils souhaitant aller vers l'administration système et réseau, la virtualisation, la supervision, le cloud et la cybersécurité. Le niveau d'autonomie et de responsabilité y est plus élevé que sur le TSSR.
            </p>
          </div>
        </div>
      </section>
{/* Section : Une formation pensée pour l'alternance — AIS */}
<section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-16">
  <div className="max-w-5xl mx-auto px-6">
    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
      Une formation pensée pour l'alternance et la montée en responsabilité
    </h2>
    <p className="text-white/90 mb-4 max-w-3xl">
      Le parcours AIS vise des profils qui souhaitent aller au-delà du support
      informatique classique.
    </p>
    <p className="text-white/90 mb-4 max-w-3xl">
      Les entreprises recherchent des administrateurs capables de comprendre
      une infrastructure dans son ensemble, de sécuriser les environnements,
      de participer aux projets techniques et d'intervenir sur des incidents
      de niveau avancé.
    </p>
    <p className="text-white/90 mb-8 max-w-3xl">
      NEOH vous accompagne dans cette montée en compétences.
    </p>
    <p className="font-semibold mb-4">Pendant la formation, vous développez :</p>
    <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-8">
      {[
        "Une vision globale de l'infrastructure IT",
        "Une posture d'administrateur systèmes, réseaux et cloud",
        "Une méthode de diagnostic niveau 2 / niveau 3",
        "Des réflexes de sécurité opérationnelle",
        "Une capacité à documenter et présenter vos choix techniques",
        "Une compréhension des enjeux de production, disponibilité et continuité",
        "Des projets techniques valorisables en entreprise et en entretien",
      ].map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
            ✓
          </span>
          <span className="text-white/90">{item}</span>
        </li>
      ))}
    </ul>
    <p className="text-white/90 font-medium max-w-3xl">
      L'objectif est de vous rendre capable de contribuer à l'exploitation, à
      la sécurisation et à l'évolution du système d'information d'une
      entreprise.
    </p>
  </div>
</section>
{/* Section : Pourquoi choisir NEOH — AIS */}
<section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-16">
  <div className="max-w-5xl mx-auto px-6">
    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Pourquoi choisir NEOH ?</h2>
    <p className="text-xl font-semibold text-white/95 mb-6">
      Une formation alignée avec les infrastructures modernes
    </p>
    <p className="text-white/90 mb-4 max-w-3xl">
      Les entreprises ne fonctionnent plus uniquement avec des serveurs
      locaux. Elles utilisent des environnements hybrides qui combinent
      datacenter, cloud, SaaS, virtualisation, supervision et cybersécurité.
    </p>
    <p className="font-semibold mb-4">
      NEOH prépare les apprenants à ces environnements actuels :
    </p>
    <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
      {[
        "Infrastructures locales et cloud",
        "Systèmes Windows, Linux et services Microsoft",
        "Réseaux sécurisés et accès distants",
        "Virtualisation, stockage et haute disponibilité",
        "Docker et premières pratiques DevOps",
        "Supervision, logs et tableaux de bord",
        "Cybersécurité, SIEM, EDR, Zero Trust et réponse à incident",
      ].map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
            ✓
          </span>
          <span className="text-white/90">{item}</span>
        </li>
      ))}
    </ul>
  </div>
</section>
{/* Section : Une pédagogie basée sur la pratique — AIS */}
<section className="bg-white text-gray-900 py-16">
  <div className="max-w-5xl mx-auto px-6">
    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
      Une pédagogie basée sur la pratique
    </h2>
    <p className="text-gray-600 mb-8 max-w-3xl">
      La formation AIS NEOH ne se limite pas à expliquer les concepts.
    </p>
    <p className="font-semibold mb-4">Vous travaillez sur :</p>
    <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-8">
      {[
        "Des environnements de lab",
        "Des machines virtuelles",
        "Des scénarios d'incidents",
        "Des configurations systèmes, réseaux et cloud",
        "Des audits de sécurité contrôlés",
        "Des tableaux de bord de supervision",
        "Des projets d'évolution d'infrastructure",
        "Des procédures et livrables professionnels",
      ].map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs">
            ✓
          </span>
          <span className="text-gray-600">{item}</span>
        </li>
      ))}
    </ul>
    <p className="text-gray-600 font-medium max-w-3xl">
      L'objectif est d'apprendre à raisonner comme un administrateur :
      analyser, choisir, configurer, sécuriser, tester, documenter et
      présenter.
    </p>
  </div>
</section>
{/* Section : Un format distanciel structuré — AIS */}
<section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-16">
  <div className="max-w-5xl mx-auto px-6">
    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
      Un format distanciel structuré
    </h2>
    <p className="text-white/90 mb-8 max-w-3xl">
      NEOH est pensé pour apprendre à distance tout en conservant une vraie
      exigence technique.
    </p>
    <p className="font-semibold mb-4">Le parcours repose sur :</p>
    <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-8">
      {[
        "Des classes virtuelles",
        "Des travaux pratiques encadrés",
        "Des labs accessibles à distance",
        "Des ressources pédagogiques organisées",
        "Des projets à documenter",
        "Des retours réguliers",
        "Un suivi de progression",
        "Une préparation progressive à l'examen et à l'entreprise",
      ].map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
            ✓
          </span>
          <span className="text-white/90">{item}</span>
        </li>
      ))}
    </ul>
    <p className="text-white/90 font-medium max-w-3xl">
      Vous apprenez à distance, mais dans un cadre structuré et
      professionnalisant.
    </p>
  </div>
</section>
{/* Section : Orientation cloud, datacenter et cybersécurité — AIS */}
<section className="bg-white text-gray-900 py-16">
  <div className="max-w-5xl mx-auto px-6">
    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
      Une orientation cloud, datacenter et cybersécurité
    </h2>
    <p className="text-gray-600 mb-8 max-w-3xl">
      Le parcours AIS NEOH est particulièrement adapté aux apprenants qui
      veulent évoluer vers des environnements d'infrastructure avancés.
    </p>
    <p className="font-semibold mb-4">
      Les apprenants développent des compétences sur :
    </p>
    <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-3">
      {[
        "Azure et AWS",
        "Cloud hybride",
        "Virtualisation et stockage",
        "Conteneurs Docker",
        "Haute disponibilité",
        "PRA / PCA",
        "Supervision et observabilité",
        "SIEM et réponse à incident",
        "Audit cybersécurité",
        "Protection du système d'information",
      ].map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs">
            ✓
          </span>
          <span className="text-gray-600">{item}</span>
        </li>
      ))}
    </ul>
  </div>
</section>
{/* Section : Une formation utile aux entreprises — AIS */}
<section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-16">
  <div className="max-w-5xl mx-auto px-6">
    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
      Une formation utile aux entreprises
    </h2>
    <p className="font-semibold mb-4">
      Un alternant AIS formé chez NEOH peut progressivement contribuer à :
    </p>
    <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
      {[
        "Administrer les serveurs et services d'infrastructure",
        "Sécuriser les accès et les systèmes",
        "Maintenir les infrastructures en condition opérationnelle",
        "Participer aux projets cloud ou virtualisation",
        "Superviser les services et traiter les alertes",
        "Documenter les procédures d'exploitation",
        "Analyser les vulnérabilités",
        "Contribuer à la mise en œuvre de mesures de cybersécurité",
        "Participer à la réponse à incident",
        "Préparer des projets d'évolution d'infrastructure",
      ].map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
            ✓
          </span>
          <span className="text-white/90">{item}</span>
        </li>
      ))}
    </ul>
  </div>
</section>
{/* Section : Les métiers visés — AIS */}
<section className="bg-white text-gray-900 py-16">
  <div className="max-w-5xl mx-auto px-6">
    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Les métiers visés</h2>
    <p className="font-semibold mb-4">
      À l'issue du parcours AIS, vous pouvez viser des postes tels que :
    </p>
    <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
      {[
        "Administrateur systèmes et réseaux",
        "Administrateur infrastructures",
        "Administrateur systèmes Linux / Windows",
        "Administrateur cloud junior",
        "Administrateur cybersécurité junior",
        "Technicien supérieur infrastructure",
        "Technicien de production IT",
        "Exploitant datacenter",
        "Administrateur supervision",
        "Administrateur infrastructure et sécurité",
        "Responsable infrastructure junior, selon expérience",
      ].map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs">
            ✓
          </span>
          <span className="text-gray-600">{item}</span>
        </li>
      ))}
    </ul>
  </div>
</section>
{/* Section : À qui s'adresse la formation — AIS */}
<section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-16">
  <div className="max-w-5xl mx-auto px-6">
    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
      À qui s'adresse la formation ?
    </h2>
    <p className="text-white/90 mb-8 max-w-3xl">
      La formation AIS s'adresse aux personnes qui souhaitent évoluer vers
      l'administration avancée d'infrastructures IT.
    </p>
    <p className="font-semibold mb-4">Elle peut convenir à :</p>
    <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-8">
      {[
        "Des étudiants souhaitant poursuivre après un Bac+2 informatique",
        "Des titulaires ou futurs titulaires d'un TSSR, BTS SIO, BUT informatique ou parcours équivalent",
        "Des techniciens systèmes et réseaux souhaitant monter en compétences",
        "Des alternants qui visent des missions plus avancées en infrastructure",
        "Des profils attirés par le cloud, le datacenter et la cybersécurité",
        "Des personnes en reconversion ayant déjà une base technique solide",
      ].map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
            ✓
          </span>
          <span className="text-white/90">{item}</span>
        </li>
      ))}
    </ul>
    <p className="text-white/90 font-medium max-w-3xl">
      Une appétence pour les systèmes, réseaux, cloud et cybersécurité est
      fortement recommandée.
    </p>
  </div>
</section>
{/* Section : Questions fréquentes — AIS */}
<section className="bg-white text-gray-900 py-16">
  <div className="max-w-3xl mx-auto px-6">
    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Questions fréquentes</h2>
    <div className="space-y-4">
      {[
        {
          q: "La formation AIS est-elle adaptée si je débute dans l'IT ?",
          a: "Le parcours AIS est plutôt destiné à des profils ayant déjà des bases en systèmes, réseaux ou support informatique. Pour un profil totalement débutant, le parcours TSSR est généralement plus adapté avant de poursuivre vers AIS.",
        },
        {
          q: "Est-ce une formation à distance ?",
          a: "Oui. NEOH est conçu pour le distanciel, avec une organisation structurée, des classes virtuelles, des ressources pédagogiques et des travaux pratiques.",
        },
        {
          q: "Est-ce qu'il y a de la pratique ?",
          a: "Oui. La pratique est au cœur du parcours : labs, infrastructures virtualisées, scénarios d'incidents, supervision, sécurité, cloud, Docker, SIEM, documentation et projet professionnel.",
        },
        {
          q: "Quels sont les sujets techniques importants ?",
          a: "Les principaux sujets sont : réseaux sécurisés, Windows Server, Linux, Active Directory, Entra ID, Microsoft 365, Azure, AWS, virtualisation, Docker, supervision, audit cybersécurité, Zero Trust, EDR, SIEM, PRA/PCA et réponse à incident.",
        },
        {
          q: "La formation prépare-t-elle à l'alternance ?",
          a: "Oui. Le parcours vise à rendre l'apprenant crédible sur des missions d'administration, d'exploitation, de supervision, de cloud et de cybersécurité opérationnelle.",
        },
        {
          q: "Quels métiers peut-on viser après la formation ?",
          a: "Les métiers visés sont principalement : administrateur systèmes et réseaux, administrateur infrastructure, administrateur cloud junior, administrateur cybersécurité junior, technicien supérieur infrastructure, exploitant datacenter ou technicien de production IT.",
        },
        {
          q: "Quelle est la différence avec le TSSR ?",
          a: "Le TSSR permet de construire une base solide en systèmes, réseaux et support. L'AIS va plus loin sur l'administration avancée, le cloud, la sécurisation des infrastructures, la supervision, la mise en production, le SIEM et la réponse aux incidents de cybersécurité.",
        },
      ].map((faq) => (
        <details
          key={faq.q}
          className="group border border-gray-200 rounded-xl overflow-hidden"
        >
          <summary className="flex items-center justify-between cursor-pointer px-6 py-4 font-semibold hover:bg-gray-50 list-none">
            {faq.q}
            <span className="text-purple-600 transition-transform group-open:rotate-45 text-xl ml-4">
              +
            </span>
          </summary>
          <p className="px-6 pb-5 text-gray-600">{faq.a}</p>
        </details>
      ))}
    </div>
  </div>
</section>
      {/* CTA */}
<section className="py-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
  <div className="max-w-4xl mx-auto px-6 text-center">
    <h2 className="text-3xl font-bold mb-6">Prêt à lancer votre carrière IT ?</h2>
    <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
      <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        className="bg-white text-indigo-600 hover:bg-slate-100 px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
        <MessageCircle className="w-5 h-5" />
        Recevoir le programme
      </a>
   <button
  type="button"
  onClick={onCandidater}
  className="bg-white text-indigo-600 hover:bg-slate-100 px-8 py-3 rounded-lg font-medium transition...">
  <FileText className="w-5 h-5" />
  Candidater
</button>                                  
<button onClick={() => setIsRecontactOpen(true)}
  className="bg-indigo-800 hover:bg-indigo-900 text-white px-8 py-3 rounded-lg font-medium transition...">
  <Phone className="w-5 h-5" />
  Être recontacté
</button>
      <button onClick={onBack} className="bg-indigo-800 hover:bg-indigo-900 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
        <ArrowLeft className="w-5 h-5" />
        Retour à l'accueil
      </button>
    </div>
  </div>
</section>
{/* Modal Être recontacté */}
{isRecontactOpen && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
      <div className="sticky top-0 bg-white border-b border-slate-200 p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <Phone className="w-5 h-5 text-indigo-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Être recontacté</h2>
        </div>
        <button onClick={() => { setIsRecontactOpen(false); setRecontactSubmitted(false); }}
          className="text-slate-400 hover:text-slate-600 transition-colors">
          <X className="w-6 h-6" />
        </button>
      </div>

      {recontactSubmitted ? (
        <div className="p-8 text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Demande envoyée !</h3>
          <p className="text-slate-600 text-sm">
            Merci, votre demande a bien été envoyée. Un conseiller NEOH vous
            recontactera rapidement pour répondre à vos questions et vous
            orienter vers le parcours le plus adapté.
          </p>
        </div>
      ) : (
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <input type="text" name="firstName" placeholder="Prénom *" value={recontactData.firstName} onChange={handleRecontactChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
            <input type="text" name="lastName" placeholder="Nom *" value={recontactData.lastName} onChange={handleRecontactChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <input type="email" name="email" placeholder="Email *" value={recontactData.email} onChange={handleRecontactChange}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
          <input type="tel" name="phone" placeholder="Téléphone *" value={recontactData.phone} onChange={handleRecontactChange}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
          <select name="sujet" value={recontactData.sujet} onChange={handleRecontactChange}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700">
            <option value="">Sujet de la demande *</option>
            <option>La formation</option>
            <option>L'alternance</option>
            <option>Le financement</option>
            <option>Je suis une entreprise</option>
            <option>Le programme</option>
          </select>
          <select name="formation" value={recontactData.formation} onChange={handleRecontactChange}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700">
            <option value="">Formation concernée *</option>
            <option>TSSR</option>
            <option>AIS</option>
            <option>Je ne sais pas encore</option>
          </select>
          <select name="moment" value={recontactData.moment} onChange={handleRecontactChange}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-slate-700">
            <option value="">Meilleur moment pour être rappelé</option>
            <option>Matin (9h — 12h)</option>
            <option>Après-midi (14h — 17h)</option>
            <option>Fin de journée (17h — 18h)</option>
          </select>
          <textarea name="message" rows={3} placeholder="Votre question ou besoin..." value={recontactData.message} onChange={handleRecontactChange}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none" />
          <label className="flex items-start gap-2 cursor-pointer">
            <input type="checkbox" checked={recontactAccepted} onChange={(e) => setRecontactAccepted(e.target.checked)}
              className="mt-1 accent-indigo-600" />
            <span className="text-xs text-slate-500 leading-relaxed">
              J'accepte que mes données soient utilisées par NEOH conformément au RGPD. *
            </span>
          </label>
          <button onClick={handleRecontactSubmit}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-lg font-bold transition-colors">
            ENVOYER MA DEMANDE
          </button>
        </div>
      )}
    </div>
  </div>
)}
    </div>
  );
}
