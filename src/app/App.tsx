import { useState, useEffect } from 'react';
import { GraduationCap, UserPlus, BookOpen, MessageCircle, Phone, Linkedin, Menu, X, ChevronRight, Mail, User, Play, Calendar, Clock } from 'lucide-react';
import TSSRPage from './TSSRPage';
import AISPage from './AISPage';
import CandidaturePage from './CandidaturePage';

const NeoLogo = () => (
  <img src="/logo-neoh.png" alt="NEOH" className="h-20 w-auto" />
);
const heroSlides = [
  {
    bg: "from-indigo-900 via-indigo-800 to-purple-900",
    label: "Administration systèmes & réseaux",
    icon: "🖥️",
  },
  {
    bg: "from-purple-900 via-purple-800 to-pink-900",
    label: "Cloud & Virtualisation",
    icon: "☁️",
  },
  {
    bg: "from-slate-900 via-indigo-900 to-slate-800",
    label: "Cybersécurité",
    icon: "🔒",
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {heroSlides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-gradient-to-br ${slide.bg} transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="flex flex-col items-center justify-center h-full gap-6 p-10">
            <div className="text-8xl">{slide.icon}</div>
            <p className="text-white text-2xl font-bold text-center">{slide.label}</p>
            <div className="w-16 h-1 bg-white/40 rounded-full" />
          </div>
        </div>
      ))}

      {/* Points de navigation */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-white scale-125' : 'bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
};
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'tssr' | 'ais' | 'candidature-tssr' | 'candidature-ais'>('home');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isTSSRModalOpen, setIsTSSRModalOpen] = useState(false);
  const [isAISModalOpen, setIsAISModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isRessourcesModalOpen, setIsRessourcesModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [appointmentData, setAppointmentData] = useState({
    name: '',
    email: '',
    phone: ''
  });
   useEffect(() => {
   window.scrollTo(0, 0);
   }, [currentPage]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Merci pour votre demande ! Nous vous contacterons rapidement.');
    setFormData({ name: '', email: '', phone: '', message: '' });
    setIsContactModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAppointmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppointmentData({
      ...appointmentData,
      [e.target.name]: e.target.value
    });
  };

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      alert('Veuillez sélectionner une date et un horaire');
      return;
    }
    console.log('Rendez-vous:', { ...appointmentData, date: selectedDate, time: selectedTime });
    alert(`Rendez-vous confirmé pour le ${selectedDate} à ${selectedTime}`);
    setIsAppointmentModalOpen(false);
    setAppointmentData({ name: '', email: '', phone: '' });
    setSelectedDate(null);
    setSelectedTime(null);
  };

  // Generate available dates (next 14 days, excluding weekends)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    let count = 0;
    let currentDate = new Date(today);

    while (count < 10) {
      currentDate.setDate(currentDate.getDate() + 1);
      const dayOfWeek = currentDate.getDay();

      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        dates.push(new Date(currentDate));
        count++;
      }
    }
    return dates;
  };

  const availableDates = getAvailableDates();
  const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  const formatDateValue = (date: Date) => {
    return date.toLocaleDateString('fr-FR');
  };

 if (currentPage === 'tssr') {
  return <TSSRPage onBack={() => setCurrentPage('home')} onCandidater={() => setCurrentPage('candidature-tssr')} />;
}
if (currentPage === 'ais') {
  return <AISPage onBack={() => setCurrentPage('home')} onCandidater={() => setCurrentPage('candidature-ais')} />;
}
if (currentPage === 'candidature-tssr') {
  return <CandidaturePage onBack={() => setCurrentPage('tssr')} formationParDefaut="TSSR — Technicien Supérieur Systèmes et Réseaux" />;
}
if (currentPage === 'candidature-ais') {
  return <CandidaturePage onBack={() => setCurrentPage('ais')} formationParDefaut="AIS — Administrateur d'Infrastructures Sécurisées" />;
}
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
  <NeoLogo />
  <div className="text-lg font-bold text-white mt-2">NEOH</div>
</div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#formations" className="hover:text-indigo-400 transition-colors">Formations en Alternance</a>
              <a href="#admissions" className="hover:text-indigo-400 transition-colors">Admissions</a>
              <button onClick={() => setIsRessourcesModalOpen(true)} className="hover:text-indigo-400 transition-colors">Ressources</button>
              <a href="#contact" className="hover:text-indigo-400 transition-colors">Contact</a>
              <button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg font-medium transition-colors">
                Je m'inscris
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 flex flex-col gap-4">
              <a href="#formations" className="hover:text-indigo-400 transition-colors">Formations en Alternance</a>
              <a href="#admissions" className="hover:text-indigo-400 transition-colors">Admissions</a>
              <button onClick={() => setIsRessourcesModalOpen(true)} className="hover:text-indigo-400 transition-colors">Ressources</button>
              <a href="#contact" className="hover:text-indigo-400 transition-colors">Contact</a>
              <button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg font-medium transition-colors">
                Je m'inscris
              </button>
            </div>
          )}
        </nav>
      </header>

      
      {/* Hero Section */}
<section className="bg-white py-0 overflow-hidden">
  <div className="max-w-7xl mx-auto grid lg:grid-cols-2 min-h-[600px]">
    
    {/* Carrousel gauche */}
    <HeroCarousel />

    {/* Texte droite */}
    <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white flex items-center px-10 py-16">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Construis ton avenir dans l'IT, le Cloud et la Cybersécurité
        </h1>
        <p className="text-xl text-white/90 mb-4">
          Tu veux travailler dans l'informatique, les réseaux, les serveurs, le cloud ou les datacenters ?
        </p>
        <p className="text-white/90 mb-4 leading-relaxed">
          NEOH est l'école informatique 100% à distance, qui te prépare aux métiers techniques les plus recherchés par les entreprises : administration systèmes, réseaux, cloud, cybersécurité, virtualisation et exploitation d'infrastructures.
        </p>
        <p className="text-white font-medium mb-4 leading-relaxed">
          Tu configures des serveurs. Tu sécurises des réseaux. Tu déploies des services cloud. Tu résous des incidents.
        </p>
        <p className="text-white/90 mb-10 leading-relaxed">
          Forme-toi à distance. Pratique sur des labs. Prépare ton alternance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#formations" className="bg-white text-indigo-600 hover:bg-slate-100 px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
            <ChevronRight className="w-5 h-5" />
            Découvrir les formations
          </a>
          <button onClick={() => setIsContactModalOpen(true)} className="bg-indigo-800 hover:bg-indigo-900 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Trouver une alternance avec NEOH
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Video Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Découvrez NEOH en vidéo</h2>
            <p className="text-slate-600">Plongez dans l'univers de nos formations IT</p>
          </div>

          <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-2xl group">
            {!isVideoPlaying ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-500/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setIsVideoPlaying(true)}
                    className="bg-white hover:bg-indigo-50 text-indigo-600 w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all transform hover:scale-110 group-hover:shadow-2xl"
                  >
                    <Play className="w-8 h-8 ml-1" fill="currentColor" />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-900 to-transparent">
                  <h3 className="text-white text-2xl font-bold mb-2">Votre avenir dans l'IT commence ici</h3>
                  <p className="text-white/80">Découvrez nos méthodes d'enseignement et témoignages d'étudiants</p>
                </div>
              </>
            ) : (
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/nwSpXct423o?autoplay=1"
                title="Vidéo NEOH"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>
      </section>

      {/* Formations Section */}
      <section id="formations" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Nos formations</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* TSSR */}
            <div className="bg-slate-800 text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              <h3 className="text-2xl font-bold mb-4">TSSR</h3>
              <p className="text-slate-300 mb-6">
                Technicien Supérieur Systèmes et Réseaux – Machines Informatiques
              </p>
              <button onClick={() => setCurrentPage('tssr')} className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
               En savoir plus
               <ChevronRight className="w-4 h-4" />
               </button>
            </div>

            {/* AIS */}
            <div className="bg-slate-800 text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
              <h3 className="text-2xl font-bold mb-4">AIS</h3>
              <p className="text-slate-300 mb-6">
                Administrateur d'Infrastructures Sécurisées – Spécialiste de systèmes
              </p>
              <button onClick={() => setCurrentPage('ais')} className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                En savoir plus
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">Prêt à lancer votre carrière IT ?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setIsContactModalOpen(true)} className="bg-white text-indigo-600 hover:bg-slate-100 px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Demander une information
            </button>
            <button onClick={() => setIsAppointmentModalOpen(true)} className="bg-indigo-800 hover:bg-indigo-900 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Prendre rendez-vous
            </button>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Demander une information</h2>
                  <p className="text-sm text-slate-600">Nous vous recontacterons rapidement</p>
                </div>
              </div>
              <button
                onClick={() => setIsContactModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Nom complet *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                    Téléphone *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                    placeholder="Parlez-nous de votre projet..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Envoyer ma demande
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Appointment Modal */}
      {isAppointmentModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <Calendar className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Prendre rendez-vous</h2>
              </div>
              <button
                onClick={() => setIsAppointmentModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <form onSubmit={handleAppointmentSubmit} className="space-y-8">
                {/* Date Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                    Choisissez une date
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {availableDates.map((date, index) => {
                      const dateValue = formatDateValue(date);
                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setSelectedDate(dateValue)}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            selectedDate === dateValue
                              ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                              : 'border-slate-200 hover:border-indigo-300 text-slate-700'
                          }`}
                        >
                          <div className="text-sm font-medium">{formatDate(date)}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-indigo-600" />
                      Choisissez un horaire
                    </h3>
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 rounded-lg border-2 font-medium transition-all ${
                            selectedTime === time
                              ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                              : 'border-slate-200 hover:border-indigo-300 text-slate-700'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Information */}
                {selectedDate && selectedTime && (
                  <div className="space-y-4 pt-4 border-t border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Vos coordonnées</h3>

                    <div>
                      <label htmlFor="apt-name" className="block text-sm font-medium text-slate-700 mb-2">
                        Nom complet *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          id="apt-name"
                          name="name"
                          value={appointmentData.name}
                          onChange={handleAppointmentChange}
                          required
                          className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="Votre nom"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="apt-email" className="block text-sm font-medium text-slate-700 mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <input
                          type="email"
                          id="apt-email"
                          name="email"
                          value={appointmentData.email}
                          onChange={handleAppointmentChange}
                          required
                          className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="apt-phone" className="block text-sm font-medium text-slate-700 mb-2">
                        Téléphone *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <input
                          type="tel"
                          id="apt-phone"
                          name="phone"
                          value={appointmentData.phone}
                          onChange={handleAppointmentChange}
                          required
                          className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="06 12 34 56 78"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-5 h-5" />
                      Confirmer le rendez-vous
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center -mt-2">
  <NeoLogo />
  <div className="text-lg font-bold text-white mt-1">NEOH</div>
</div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
              <a href="#mentions-legales" className="hover:text-white transition-colors">Mentions légales</a>
              <a href="#cgu" className="hover:text-white transition-colors">CGU</a>
              <a href="#accessibilite" className="hover:text-white transition-colors">Accessibilité</a>
              <a href="#cookies" className="hover:text-white transition-colors">Politique cookies</a>
            </div>

            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/stephane-henry-4a06018b/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <button onClick={() => setIsPhoneModalOpen(true)} className="hover:text-indigo-400 transition-colors">
                <Phone className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Ressources Modal */}
      {isRessourcesModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-slate-800 text-white p-6 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-500 p-2 rounded-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Ressources</h2>
                  <p className="text-slate-300 text-sm">Notre approche pédagogique</p>
                </div>
              </div>
              <button onClick={() => setIsRessourcesModalOpen(false)} className="hover:bg-white/20 p-2 rounded-lg transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Intro */}
              <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-xl p-5">
                <p className="text-indigo-800 font-medium leading-relaxed">
                  Chez NEOH, nous promettons à nos apprenants une formation à distance exigeante, concrète et professionnalisante, animée par un expert issu du terrain, avec les outils et le matériel nécessaires pour pratiquer réellement et monter en compétences dans des conditions proches du monde professionnel.
                </p>
              </div>

              {/* Points clés */}
              <div className="space-y-4">
                {[
                  {
                    icon: <User className="w-5 h-5 text-indigo-600" />,
                    text: "Un apprentissage ancré dans la réalité du terrain, grâce à un formateur expert du domaine, ayant déjà exercé en conditions réelles."
                  },
                  {
                    icon: <GraduationCap className="w-5 h-5 text-indigo-600" />,
                    text: "Une transmission de compétences concrètes et directement exploitables en entreprise."
                  },
                  {
                    icon: <Play className="w-5 h-5 text-indigo-600" />,
                    text: "Un accompagnement à distance structuré, permettant de se former sérieusement sans être physiquement en centre."
                  },
                  {
                    icon: <BookOpen className="w-5 h-5 text-indigo-600" />,
                    text: "La mise à disposition de matériel et d'un environnement technique permettant à l'apprenant de pratiquer pleinement, manipuler, tester et progresser dans de vraies conditions."
                  },
                  {
                    icon: <ChevronRight className="w-5 h-5 text-indigo-600" />,
                    text: "Une pédagogie orientée vers la pratique, l'autonomie, la rigueur professionnelle et l'employabilité."
                  }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <div className="bg-indigo-100 p-2 rounded-lg shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <p className="text-slate-700 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => { setIsRessourcesModalOpen(false); setIsContactModalOpen(true); }}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Demander une information
                </button>
                <button
                  onClick={() => { setIsRessourcesModalOpen(false); setIsAppointmentModalOpen(true); }}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Prendre rendez-vous
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Phone Modal */}
      {isPhoneModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full">
            <div className="sticky top-0 bg-slate-800 text-white p-5 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-500 p-2 rounded-lg">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-bold">Nous appeler</h2>
              </div>
              <button onClick={() => setIsPhoneModalOpen(false)} className="hover:bg-white/20 p-2 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 text-center space-y-4">
              <p className="text-slate-500 text-sm">Notre équipe est disponible du lundi au vendredi, de 9h à 18h</p>
              <a href="tel:+33472531846" className="block bg-indigo-50 border-2 border-indigo-200 rounded-xl py-4 px-6 hover:bg-indigo-100 transition-colors">
                <p className="text-3xl font-bold text-indigo-700 tracking-wide">04 72 53 18 46</p>
              </a>
              <p className="text-slate-400 text-xs">Cliquez sur le numéro pour appeler directement</p>
            </div>
          </div>
        </div>
      )}

      {/* AIS Modal */}
      {isAISModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-slate-800 text-white p-6 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="bg-purple-500 p-2 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">AIS</h2>
                  <p className="text-slate-300 text-sm">Administrateur d'Infrastructures Sécurisées</p>
                </div>
              </div>
              <button onClick={() => setIsAISModalOpen(false)} className="hover:bg-white/20 p-2 rounded-lg transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex flex-wrap gap-3">
                <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  900h de formation
                </span>
                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  100% à distance
                </span>
                <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-medium flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  En alternance
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center">
                  <p className="text-slate-500 text-sm mb-1">Niveau d'études requis</p>
                  <p className="text-3xl font-bold text-slate-800">Niveau 3</p>
                  <p className="text-slate-500 text-sm mt-1">CAP / BEP</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 text-center">
                  <p className="text-purple-600 text-sm mb-1">Niveau en sortie</p>
                  <p className="text-3xl font-bold text-purple-700">Niveau 6</p>
                  <p className="text-purple-500 text-sm mt-1">Bac+3 / Licence</p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-800 text-lg mb-3">Présentation de la formation</h3>
                <p className="text-slate-600 leading-relaxed">
                  La formation AIS vous prépare au métier d'Administrateur d'Infrastructures Sécurisées.
                  En 900 heures de formation dispensées entièrement à distance, vous maîtriserez la conception,
                  l'administration et la sécurisation des infrastructures systèmes et réseaux d'entreprise.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-800 text-lg mb-3">Modalités pédagogiques</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-purple-500 mt-1 shrink-0" />Formation 100% à distance, accessible depuis chez vous</li>
                  <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-purple-500 mt-1 shrink-0" />Contrat d'alternance avec une entreprise partenaire</li>
                  <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-purple-500 mt-1 shrink-0" />900 heures de formation au total</li>
                  <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-purple-500 mt-1 shrink-0" />Accompagnement personnalisé par des formateurs experts</li>
                  <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-purple-500 mt-1 shrink-0" />Titre professionnel reconnu par l'État (niveau 6 RNCP)</li>
                </ul>
              </div>

              {/* Public visé */}
              <div>
                <h3 className="font-bold text-slate-800 text-lg mb-3">Public visé</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Cette formation s'adresse à un public plus avancé, qui souhaite administrer, sécuriser et faire évoluer des infrastructures informatiques locales ou cloud. Elle vise surtout :
                </p>
                <ul className="space-y-2 text-slate-600">
                  {[
                    "Les personnes ayant déjà un socle technique en systèmes, réseaux ou support informatique ;",
                    "Les titulaires d'un premier diplôme/titre en informatique souhaitant monter en compétence ;",
                    "Les techniciens systèmes et réseaux voulant évoluer vers l'administration et la cybersécurité ;",
                    "Les alternants, salariés ou personnes en reconversion ayant déjà une base technique solide."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-purple-500 mt-1 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Note */}
              <div className="bg-purple-50 border-l-4 border-purple-500 rounded-r-xl p-4">
                <p className="text-purple-800 leading-relaxed text-sm">
                  L'AIS correspond davantage à des profils souhaitant aller vers l'administration système et réseau, la virtualisation, la supervision, le cloud et la cybersécurité. Le niveau d'autonomie et de responsabilité y est plus élevé que sur le TSSR.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => { setIsAISModalOpen(false); setIsContactModalOpen(true); }}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Demander une information
                </button>
                <button
                  onClick={() => { setIsAISModalOpen(false); setIsAppointmentModalOpen(true); }}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Prendre rendez-vous
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TSSR Modal */}
      {isTSSRModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-slate-800 text-white p-6 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-500 p-2 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">TSSR</h2>
                  <p className="text-slate-300 text-sm">Technicien Supérieur Systèmes et Réseaux</p>
                </div>
              </div>
              <button onClick={() => setIsTSSRModalOpen(false)} className="hover:bg-white/20 p-2 rounded-lg transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-3">
                <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  800h de formation
                </span>
                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  100% à distance
                </span>
                <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-medium flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  En alternance
                </span>
              </div>

              {/* Niveaux */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center">
                  <p className="text-slate-500 text-sm mb-1">Niveau d'études requis</p>
                  <p className="text-3xl font-bold text-slate-800">Niveau 3</p>
                  <p className="text-slate-500 text-sm mt-1">CAP / BEP</p>
                </div>
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 text-center">
                  <p className="text-indigo-600 text-sm mb-1">Niveau en sortie</p>
                  <p className="text-3xl font-bold text-indigo-700">Niveau 5</p>
                  <p className="text-indigo-500 text-sm mt-1">Bac+2 / BTS</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-bold text-slate-800 text-lg mb-3">Présentation de la formation</h3>
                <p className="text-slate-600 leading-relaxed">
                  La formation TSSR vous prépare au métier de Technicien Supérieur Systèmes et Réseaux.
                  En 800 heures de formation dispensées entièrement à distance, vous acquerrez les compétences
                  nécessaires pour administrer et maintenir les infrastructures informatiques d'une entreprise.
                </p>
              </div>

              {/* Modalités */}
              <div>
                <h3 className="font-bold text-slate-800 text-lg mb-3">Modalités pédagogiques</h3>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-indigo-500 mt-1 shrink-0" />Formation 100% à distance, accessible depuis chez vous</li>
                  <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-indigo-500 mt-1 shrink-0" />Contrat d'alternance avec une entreprise partenaire</li>
                  <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-indigo-500 mt-1 shrink-0" />800 heures de formation au total</li>
                  <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-indigo-500 mt-1 shrink-0" />Accompagnement personnalisé par des formateurs experts</li>
                  <li className="flex items-start gap-2"><ChevronRight className="w-4 h-4 text-indigo-500 mt-1 shrink-0" />Titre professionnel reconnu par l'État (niveau 5 RNCP)</li>
                </ul>
              </div>

              {/* Public visé */}
              <div>
                <h3 className="font-bold text-slate-800 text-lg mb-3">Public visé</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Cette formation s'adresse à des personnes qui veulent travailler dans l'exploitation informatique, l'administration de premier niveau avancé, le support utilisateurs, les serveurs et les réseaux. Elle vise surtout :
                </p>
                <ul className="space-y-2 text-slate-600">
                  {[
                    "Les débutants motivés qui veulent entrer dans les métiers systèmes et réseaux ;",
                    "Les personnes en reconversion professionnelle vers l'IT ;",
                    "Les profils ayant déjà une première base en informatique et souhaitant se professionnaliser ;",
                    "Les alternants ou demandeurs d'emploi qui veulent accéder à un poste de technicien systèmes et réseaux."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-indigo-500 mt-1 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Note */}
              <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-xl p-4">
                <p className="text-indigo-800 leading-relaxed text-sm">
                  Le TSSR correspond bien à un public qui aime le concret, la résolution d'incidents, le support, l'administration Windows/Linux, les réseaux IP et la maintenance d'infrastructures. Le titre prépare à intervenir sous la responsabilité d'un administrateur ou d'un responsable technique, en entreprise, en ESN ou en DSI.
                </p>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => { setIsTSSRModalOpen(false); setIsContactModalOpen(true); }}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Demander une information
                </button>
                <button
                  onClick={() => { setIsTSSRModalOpen(false); setIsAppointmentModalOpen(true); }}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Prendre rendez-vous
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
