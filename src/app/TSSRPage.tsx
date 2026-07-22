import { useState } from 'react';
import { ChevronRight, MessageCircle, Clock, BookOpen, UserPlus, ArrowLeft, FileText, Phone, X } from 'lucide-react';

interface TSSRPageProps {
  onBack: () => void;
  onCandidater: () => void;
}



const tssrModules = {
  1: [
    { title: "Accueil, positionnement et méthode de travail NEOH", domain: "Méthodologie professionnelle", description: "Présenter le fonctionnement de la formation, les méthodes de travail attendues, les outils utilisés et évaluer le niveau de départ des apprenants afin d'adapter l'accompagnement.", hours: 2 },
    { title: "Les attentes du titre TSSR", domain: "Projet / Évaluation", description: "Comprendre les objectifs du titre professionnel TSSR, les compétences visées, les modalités d'évaluation, le dossier professionnel et les attendus de la certification.", hours: 2 },
    { title: "Fondamentaux informatique, postes clients et environnement de lab", domain: "Systèmes", description: "Acquérir les bases de l'environnement informatique, comprendre le fonctionnement d'un poste client et apprendre à utiliser un environnement de lab pour réaliser les travaux pratiques.", hours: 31 },
    { title: "Réseaux IP fondamentaux", domain: "Réseaux", description: "Comprendre les bases des réseaux informatiques : adressage IP, masque, passerelle, DNS, DHCP, routage simple, tests de connectivité et premiers diagnostics réseau.", hours: 70 },
    { title: "Exploitation de serveurs Windows et domaine Active Directory", domain: "Systèmes", description: "Installer, configurer et exploiter un environnement Windows Server avec Active Directory, DNS, DHCP, GPO, comptes utilisateurs, groupes et postes intégrés au domaine.", hours: 70 },
    { title: "Exploitation de serveurs Linux", domain: "Systèmes", description: "Découvrir l'administration d'un serveur Linux : commandes de base, utilisateurs, droits, services, fichiers de configuration, accès SSH et premiers diagnostics système.", hours: 35 },
    { title: "Support utilisateur et centre de services", domain: "Support IT", description: "Apprendre à traiter les demandes et incidents utilisateurs, utiliser un outil de ticketing, qualifier un problème, prioriser les interventions et documenter les actions réalisées.", hours: 35 },
    { title: "Introduction à la Cybersécurité", domain: "Cybersécurité", description: "Découvrir les principes essentiels de la cybersécurité : menaces courantes, bonnes pratiques, protection des comptes, sécurité des postes, sensibilisation au phishing et hygiène numérique.", hours: 35 },
    { title: "Initiation aux services cloud : Microsoft 365, Azure et AWS", domain: "Cloud", description: "Découvrir les principaux services cloud utilisés en entreprise, comprendre les bases de Microsoft 365, Azure et AWS, et réaliser des premières actions d'administration simples.", hours: 35 },
    { title: "Virtualisation serveur, stockage et haute disponibilité", domain: "Virtualisation", description: "Comprendre la virtualisation des serveurs, le stockage associé, les snapshots, la disponibilité des services et les principes permettant de limiter les interruptions d'activité.", hours: 70 },
    { title: "Automatisation avec scripts", domain: "Automatisation", description: "S'initier à l'automatisation des tâches techniques avec des scripts PowerShell et Bash afin de gagner du temps, fiabiliser les actions répétitives et documenter les procédures.", hours: 35 },
    { title: "Initiation au pare-feu et aux règles de filtrage réseau", domain: "Réseaux", description: "Comprendre le rôle d'un pare-feu, créer des règles de filtrage simples, gérer le trafic entrant et sortant, appliquer du NAT et tester les communications autorisées ou bloquées.", hours: 35 },
  ],
  2: [
    { title: "Sauvegardes, restaurations et continuité d'activité", domain: "Cybersécurité", description: "Mettre en place des sauvegardes simples, tester des restaurations, comprendre les risques de perte de données et appliquer les principes de continuité d'activité.", hours: 35 },
    { title: "Déploiement et maintien des postes de travail", domain: "Support IT", description: "Préparer, déployer, configurer et maintenir des postes clients en environnement professionnel, avec gestion des mises à jour, applications, profils et paramètres système.", hours: 35 },
    { title: "Supervision et exploitation d'une infrastructure hybride", domain: "Systèmes", description: "Mettre en place une supervision de base, suivre l'état des serveurs et services, analyser les alertes et exploiter une infrastructure composée d'éléments locaux et cloud.", hours: 35 },
    { title: "Atelier de diagnostic et résolution d'incidents techniques (Troubleshooting)", domain: "Support IT", description: "Réaliser des mises en situation pratiques sur une infrastructure volontairement dégradée afin d'identifier les causes d'incidents, corriger les problèmes et documenter les résolutions.", hours: 35 },
    { title: "Administration des systèmes Linux", domain: "Systèmes", description: "Approfondir l'administration Linux : gestion des services, utilisateurs, permissions, journaux, sécurité de base, automatisation simple et exploitation d'un serveur en production.", hours: 35 },
    { title: "Cybersécurité Avancée : Hacking et Sécurité Réseaux", domain: "Réseaux", description: "Comprendre les techniques d'attaque courantes dans un cadre pédagogique sécurisé afin de mieux identifier les vulnérabilités, renforcer les protections et sécuriser les réseaux.", hours: 35 },
    { title: "Fondamentaux de la VoIP : SIP, softphone et téléphonie IP", domain: "Réseaux", description: "Découvrir les principes de la téléphonie IP, configurer des comptes SIP, utiliser des softphones, comprendre les flux voix et diagnostiquer les problèmes de communication.", hours: 35 },
    { title: "Hébergement web sécurisé : certificats SSL/TLS et PKI", domain: "Systèmes", description: "Déployer un site web sécurisé, comprendre le rôle des certificats numériques, mettre en place HTTPS et découvrir les principes d'une infrastructure à clés publiques.", hours: 35 },
    { title: "Méthodes, communication et veille professionnelle en environnement IT", domain: "Méthodologie professionnelle", description: "Développer les compétences professionnelles nécessaires en entreprise : communication, organisation, gestion de projet, bonnes pratiques ITIL et veille technologique.", hours: 35 },
    { title: "Préparation aux épreuves certificatives : examens blancs, dossier professionnel et oral", domain: "Projet / Évaluation", description: "Préparer les apprenants à la certification à travers des examens blancs, la finalisation du dossier professionnel, des mises en situation et des entraînements à l'oral.", hours: 35 },
    { title: "Analyse des journaux systèmes et réseau", domain: "Support IT", description: "Apprendre à lire, interpréter et exploiter les journaux Windows, Linux, réseau et sécurité afin d'identifier des erreurs, incidents ou comportements anormaux.", hours: 35 },
    { title: "Fondamentaux des conteneurs et des pratiques DevOps", domain: "Systèmes", description: "Découvrir les conteneurs, Docker, Docker Compose, Git et les premières pratiques DevOps afin de comprendre les nouveaux modes de déploiement applicatif.", hours: 35 },
    { title: "IA générative et productivité professionnelle en environnement IT", domain: "Support IT", description: "Utiliser l'IA générative de manière professionnelle pour aider au diagnostic, produire de la documentation, structurer des procédures, réaliser une veille et gagner en productivité.", hours: 35 },
  ]
};

const domainColors: { [key: string]: string } = {
  "Réseaux": "bg-blue-100 text-blue-700",
  "Systèmes": "bg-indigo-100 text-indigo-700",
  "Cybersécurité": "bg-red-100 text-red-700",
  "Support IT": "bg-green-100 text-green-700",
  "Cloud": "bg-sky-100 text-sky-700",
  "Virtualisation": "bg-purple-100 text-purple-700",
  "Automatisation": "bg-orange-100 text-orange-700",
  "Méthodologie professionnelle": "bg-slate-100 text-slate-700",
  "Projet / Évaluation": "bg-yellow-100 text-yellow-700",
};

export default function TSSRPage({ onBack, onCandidater }: TSSRPageProps) {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', situation: '' });
  const [accepted, setAccepted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [activeYear, setActiveYear] = useState<1 | 2>(1);
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
              <span className="bg-white/15 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full">BAC+2 — NIVEAU 5</span>
              <span className="bg-slate-900/40 backdrop-blur-sm border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full">RNCP 37682</span>
              <span className="bg-white/15 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full">ALTERNANCE</span>
              <span className="bg-slate-900/40 backdrop-blur-sm border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full">100% À DISTANCE</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2 leading-tight">Devenez</h1>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Technicien(ne) Supérieur(e)<br />Systèmes et Réseaux</h2>
            <div className="space-y-4 text-white/90 text-lg max-w-2xl mb-10 leading-relaxed">
  <p>
    Le parcours <strong>Technicien Supérieur Systèmes et Réseaux</strong> de NEOH prépare aux métiers
    du support informatique, de l'administration systèmes, des réseaux, du cloud et
    de la cybersécurité opérationnelle.
  </p>
  <p>
    Cette formation s'adresse aux étudiants, alternants et personnes en reconversion
    qui souhaitent construire une vraie base technique pour travailler dans
    l'informatique d'entreprise.
  </p>
  <p>
    Chez NEOH, vous apprenez à installer, administrer, sécuriser, superviser et
    dépanner des environnements IT proches de ceux utilisés en entreprise : postes
    de travail, serveurs Windows et Linux, Active Directory, réseaux IP,
    virtualisation, Microsoft 365, cloud, sauvegardes et sécurité.
  </p>
  <p>
    <strong>Une formation 100 % à distance, orientée pratique, avec des labs techniques et
    des mises en situation professionnelles.</strong>
  </p>
</div>

<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 pt-8 border-t border-white/20">
              <div><p className="text-3xl font-bold">24</p><p className="text-white/70 text-sm">MOIS</p></div>
              <div><p className="text-3xl font-bold">910h </p><p className="text-white/70 text-sm">DE COURS EN DISTANCIEL</p></div>
              <div><p className="text-3xl font-bold">80% </p><p className="text-white/70 text-sm">LABS PRATIQUES</p></div>
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
                <h3 className="text-2xl font-bold text-slate-900 mb-1">Recevoir le programme complet</h3>
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
                    <input type="checkbox" id="rgpd" checked={accepted} onChange={(e) => { setAccepted(e.target.checked); if (errors.accepted) setErrors({ ...errors, accepted: '' }); }} className="mt-1 accent-indigo-600" />
                    <label htmlFor="rgpd" className="text-xs text-slate-500 leading-relaxed">J'accepte que mes données soient utilisées par NEOH conformément au RGPD.</label>
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
            <p className="text-4xl font-bold text-slate-800">Niveau 4</p>
            <p className="text-slate-500 text-sm mt-1">Bac+1</p>
          </div>
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 text-center shadow-sm">
            <p className="text-indigo-600 text-sm mb-1">Niveau en sortie</p>
            <p className="text-4xl font-bold text-indigo-700">Niveau 5</p>
            <p className="text-indigo-500 text-sm mt-1">Bac+2 / BTS</p>
          </div>
        </div>
      </section>
{/* Section : Ce que vous saurez faire */}
<section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-16">
  <div className="max-w-5xl mx-auto px-6">
    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
      Ce que vous saurez faire à l'issue de la formation
    </h2>
    <p className="text-white/90 mb-8 leading-relaxed">
      À la fin du parcours, vous serez capable d'intervenir sur une
      infrastructure informatique d'entreprise, d'assurer le support aux
      utilisateurs, de maintenir les services en fonctionnement et de
      participer à leur sécurisation.
    </p>
    <p className="font-semibold mb-4">Vous apprendrez notamment à :</p>
    <ul className="space-y-3">
      {[
        "installer et configurer des postes de travail",
        "administrer des serveurs Windows et Linux",
        "gérer des utilisateurs, groupes, droits et services Active Directory",
        "configurer les services réseaux essentiels : DNS, DHCP, adressage IP, routage, VPN",
        "exploiter des environnements virtualisés",
        "utiliser des services cloud comme Microsoft 365, Azure et AWS",
        "diagnostiquer et résoudre des incidents techniques",
        "mettre en place des sauvegardes et restaurations",
        "superviser une infrastructure et analyser des alertes",
        "appliquer les premières bonnes pratiques de cybersécurité",
        "documenter vos actions comme dans un vrai service informatique",
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
      {/* Programme */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-medium flex items-center gap-2"><Clock className="w-4 h-4" />910h de formation en Distanciel</span>
            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium flex items-center gap-2"><BookOpen className="w-4 h-4" />2/3 en entreprise</span>
            <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-medium flex items-center gap-2"><UserPlus className="w-4 h-4" />En alternance</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">Programme de la formation</h2>
          <p className="text-slate-500 mb-8">25 modules répartis sur 2 ans de formation en alternance.</p>
          
          {/* Onglets années */}
          <div className="flex gap-2 mb-8">
            {([1, 2] as const).map((year) => (
              <button key={year} onClick={() => setActiveYear(year)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${activeYear === year ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                Année {year}
                <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${activeYear === year ? 'bg-white/20' : 'bg-slate-200'}`}>
                  {tssrModules[year].length} modules
                </span>
              </button>
            ))}
          </div>

          {/* Cartes modules */}
          <div className="grid gap-4">
            {tssrModules[activeYear].map((module, i) => (
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

          <div className="mt-8 bg-indigo-50 border-l-4 border-indigo-500 rounded-r-xl p-5">
            <p className="text-indigo-700 font-semibold">Total de la formation : 910h</p>
          </div>
        </div>
      </section>
{/* Section : Une formation pensée pour l'alternance */}
<section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-16">
  <div className="max-w-5xl mx-auto px-6">
    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
      Une formation pensée pour l'alternance
    </h2>
    <p className="text-white/90 mb-4 max-w-3xl">
      Trouver une alternance dans l'IT ne repose pas uniquement sur la
      motivation. Les entreprises recherchent des profils capables de
      comprendre un environnement technique, de communiquer clairement, de
      documenter leurs interventions et de progresser rapidement.
    </p>
    <p className="text-white/90 mb-8 max-w-3xl">
      NEOH accompagne les apprenants dans cette logique professionnelle.
    </p>
    <p className="font-semibold mb-4">Pendant la formation, vous développez :</p>
    <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-8">
      {[
        "Des compétences techniques concrètes",
        "Une méthode de diagnostic",
        "Une posture professionnelle",
        "Des réflexes de documentation",
        "Des livrables présentables en entreprise",
        "Une compréhension des attentes d'un service informatique",
      ].map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
            ✓
          </span>
          <span className="text-white/90">{item}</span>
        </li>
      ))}
    </ul>
    <p className="text-white/90 max-w-3xl">
      L'objectif est de vous rendre crédible face à une entreprise dès le
      début du parcours, puis de vous faire monter progressivement en
      autonomie.
    </p>
  </div>
</section>
{/* Section : Pourquoi choisir NEOH */}
<section className="bg-white text-gray-900 py-16">
  <div className="max-w-5xl mx-auto px-6">
    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Pourquoi choisir NEOH ?</h2>
    <p className="text-xl font-semibold text-purple-600 mb-6">
      Une formation conçue pour l'IT d'aujourd'hui
    </p>
    <p className="text-gray-600 max-w-3xl mb-4">
      Les entreprises utilisent des environnements de plus en plus hybrides :
      serveurs locaux, cloud, Microsoft 365, virtualisation, supervision,
      cybersécurité et automatisation.
    </p>
    <p className="text-gray-600 max-w-3xl font-medium">
      NEOH prépare les apprenants à ces réalités.
    </p>
  </div>
</section>
{/* Section : Une pédagogie basée sur la pratique */}
<section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-16">
  <div className="max-w-5xl mx-auto px-6">
    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
      Une pédagogie basée sur la pratique
    </h2>
    <p className="text-white/90 mb-8 max-w-3xl">
      La formation ne se limite pas à des cours théoriques.
    </p>
    <p className="font-semibold mb-4">Vous travaillez sur :</p>
    <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-8">
      {[
        "Des machines virtuelles",
        "Des scénarios d'incidents",
        "Des labs systèmes et réseaux",
        "Des exercices de configuration",
        "Des projets techniques",
        "Des procédures à rédiger",
        "Des mises en situation proches de l'entreprise",
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
      L'objectif est d'apprendre en faisant.
    </p>
  </div>
</section>
{/* Section : Un format distanciel */}
<section className="bg-white text-gray-900 py-16">
  <div className="max-w-5xl mx-auto px-6">
    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Un format distanciel</h2>
    <p className="text-gray-600 mb-8 max-w-3xl">
      NEOH est pensé pour apprendre à distance sans être isolé.
    </p>
    <p className="font-semibold mb-4">Le parcours repose sur :</p>
    <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
      {[
        "Des classes virtuelles",
        "Des travaux pratiques encadrés",
        "Des ressources pédagogiques accessibles en ligne",
        "Des retours réguliers",
        "Un suivi de progression",
        "Une organisation claire des modules",
        "Des projets à réaliser et documenter",
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
{/* Section : Orientation cloud, datacenter et cybersécurité */}
<section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-16">
  <div className="max-w-5xl mx-auto px-6">
    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
      Une orientation cloud, datacenter et cybersécurité
    </h2>
    <p className="text-white/90 mb-8 max-w-3xl">
      Le TSSR NEOH donne une base solide pour évoluer ensuite vers des métiers
      plus avancés : administration systèmes, cloud, datacenter, cybersécurité
      ou infrastructure.
    </p>
    <p className="font-semibold mb-4">
      Les apprenants découvrent progressivement :
    </p>
    <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-3">
      {[
        "Windows Server",
        "Linux",
        "Active Directory",
        "Microsoft 365",
        "Azure et AWS",
        "Virtualisation",
        "Supervision",
        "Sauvegardes",
        "Firewalling",
        "Sécurité réseau",
        "Docker",
        "Troubleshooting",
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
{/* Section : Une formation utile aux entreprises */}
<section className="bg-white text-gray-900 py-16">
  <div className="max-w-5xl mx-auto px-6">
    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
      Une formation utile aux entreprises
    </h2>
    <p className="font-semibold mb-4">
      Un alternant formé chez NEOH peut progressivement contribuer à :
    </p>
    <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
      {[
        "Traiter les tickets utilisateurs",
        "Maintenir les postes de travail",
        "Administrer des comptes et accès",
        "Participer à l'exploitation des serveurs",
        "Surveiller les alertes",
        "Documenter les procédures",
        "Contribuer à la sécurisation des systèmes",
        "Participer à des projets d'infrastructure",
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
{/* Section : À qui s'adresse la formation */}
<section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-16">
  <div className="max-w-5xl mx-auto px-6">
    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
      À qui s'adresse la formation ?
    </h2>
    <p className="text-white/90 mb-8 max-w-3xl">
      La formation s'adresse aux personnes qui souhaitent se former aux
      métiers techniques de l'informatique d'entreprise.
    </p>
    <p className="font-semibold mb-4">Elle peut convenir à :</p>
    <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-8">
      {[
        "Des étudiants qui cherchent une alternance dans l'IT",
        "Des personnes en reconversion",
        "Des profils ayant déjà une première appétence informatique",
        "Des candidats souhaitant évoluer vers les systèmes, réseaux, cloud ou cybersécurité",
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
      Une forte motivation, de la rigueur et un intérêt pour la résolution de
      problèmes techniques sont essentiels.
    </p>
  </div>
</section>
{/* Section : Questions fréquentes */}
<section className="bg-white text-gray-900 py-16">
  <div className="max-w-3xl mx-auto px-6">
    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Questions fréquentes</h2>
    <div className="space-y-4">
      {[
        {
          q: "La formation est-elle adaptée si je débute dans l'IT ?",
          a: "Oui. Le parcours TSSR est pensé pour construire progressivement les bases : postes clients, réseaux, systèmes, support, Linux, Windows Server, cloud et cybersécurité. La motivation et la régularité sont essentielles.",
        },
        {
          q: "Est-ce une formation à distance ?",
          a: "Oui. NEOH est conçu pour le distanciel, avec une organisation structurée, des classes virtuelles, des ressources pédagogiques et des travaux pratiques.",
        },
        {
          q: "Est-ce qu'il y a de la pratique ?",
          a: "Oui. La pratique est au cœur du parcours : labs, machines virtuelles, configurations, scénarios d'incidents, troubleshooting, documentation et projets.",
        },
        {
          q: "Quels sont les sujets techniques importants ?",
          a: "Les principaux sujets sont : Windows Server, Linux, Active Directory, réseaux IP, DNS, DHCP, VPN, Microsoft 365, cloud, virtualisation, sauvegardes, supervision, cybersécurité et automatisation.",
        },
        {
          q: "La formation prépare-t-elle à l'alternance ?",
          a: "Oui. Le parcours vise à rendre l'apprenant crédible en entreprise, avec des compétences techniques, une méthode de travail, des livrables professionnels et une meilleure compréhension des attentes d'un service IT.",
        },
        {
          q: "Quels métiers peut-on viser après la formation ?",
          a: "Les métiers visés sont principalement : technicien systèmes et réseaux, technicien support, technicien de proximité, technicien helpdesk, technicien infrastructure, technicien d'exploitation ou administrateur junior.",
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
