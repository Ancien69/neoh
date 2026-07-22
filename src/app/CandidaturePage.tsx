import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function CandidaturePage({
  onBack,
  formationParDefaut,
}: {
  onBack: () => void;
  formationParDefaut?: string;
}) {
  const [envoye, setEnvoye] = useState(false);

  const handleSubmit = () => {
    // TODO : envoyer les données vers votre backend / service d'emails
    setEnvoye(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ---- Page de confirmation ----
  if (envoye) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white flex items-center justify-center px-6">
        <div className="max-w-xl text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Merci pour votre candidature !</h1>
          <p className="text-white/90 mb-8">
            L'équipe NEOH va étudier votre profil et vous recontacter
            rapidement pour échanger sur votre projet, votre niveau actuel et
            les prochaines étapes.
          </p>
          <button
            onClick={onBack}
            className="bg-white text-indigo-600 hover:bg-slate-100 px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Retour à l'accueil
          </button>
        </div>
      </section>
    );
  }

  // ---- Formulaire ----
  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Candidature formation NEOH</h1>
          <p className="text-white/90">
            Remplissez ce formulaire pour candidater. L'équipe NEOH étudiera
            votre profil et vous recontactera rapidement.
          </p>
        </div>
      </section>

      {/* Formulaire */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6">

            {/* Identité */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Prénom *</label>
                <input type="text" required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              <div>
                <label className="block font-medium mb-1">Nom *</label>
                <input type="text" required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
            </div>

            {/* Contact */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Email *</label>
                <input type="email" required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              <div>
                <label className="block font-medium mb-1">Téléphone *</label>
                <input type="tel" required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
            </div>

            {/* Formation + situation */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Formation souhaitée *</label>
                <select required defaultValue={formationParDefaut || ""}
  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white">
  <option value="">— Choisir —</option>
  <option>TSSR — Technicien Supérieur Systèmes et Réseaux</option>
  <option>AIS — Administrateur d'Infrastructures Sécurisées</option>
</select>
              </div>
              <div>
                <label className="block font-medium mb-1">Situation actuelle *</label>
                <select required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white">
                  <option value="">— Choisir —</option>
                  <option>Étudiant</option>
                  <option>Salarié</option>
                  <option>Demandeur d'emploi</option>
                  <option>En reconversion</option>
                </select>
              </div>
            </div>

            {/* Niveau + expérience */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Niveau d'études *</label>
                <select required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white">
                  <option value="">— Choisir —</option>
                  <option>Sans diplôme</option>
                  <option>CAP / BEP</option>
                  <option>Bac</option>
                  <option>Bac+1</option>
                  <option>Bac+2 (BTS, TSSR...)</option>
                  <option>Bac+3 et plus</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Expérience en informatique *</label>
                <select required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white">
                  <option value="">— Choisir —</option>
                  <option>Débutant</option>
                  <option>Quelques notions</option>
                  <option>Déjà formé</option>
                  <option>Déjà en poste dans l'IT</option>
                </select>
              </div>
            </div>

            {/* Alternance + localisation */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Recherche d'alternance *</label>
                <select required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white">
                  <option value="">— Choisir —</option>
                  <option>Oui, je cherche une entreprise</option>
                  <option>Non</option>
                  <option>J'ai déjà une entreprise</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Ville / Région *</label>
                <input type="text" required placeholder="Ex : Lyon, Auvergne-Rhône-Alpes"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
            </div>

            {/* Rentrée */}
            <div>
              <label className="block font-medium mb-1">Date de rentrée souhaitée *</label>
              <select required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white">
                <option value="">— Choisir —</option>
                <option>Septembre 2026</option>
                <option>Janvier 2027</option>
                <option>Autre / à discuter</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block font-medium mb-1">Votre projet, vos motivations</label>
              <textarea rows={5}
                placeholder="Parlez-nous de votre projet professionnel..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>

            {/* CV */}
            <div>
              <label className="block font-medium mb-1">CV (optionnel)</label>
              <input type="file" accept=".pdf,.doc,.docx"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:bg-purple-100 file:text-purple-700 file:font-medium hover:file:bg-purple-200 cursor-pointer" />
              <p className="text-sm text-gray-500 mt-1">Formats acceptés : PDF, Word</p>
            </div>

            {/* RGPD */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" required className="mt-1 w-4 h-4 accent-purple-600" />
              <span className="text-sm text-gray-600">
                J'accepte que mes données soient utilisées par NEOH pour traiter
                ma candidature et me recontacter. Conformément au RGPD, je peux
                exercer mes droits d'accès, de rectification et de suppression à
                tout moment. *
              </span>
            </label>

            {/* Envoi */}
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Envoyer ma candidature
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}