import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, ChevronRight, Home, GraduationCap, UserPlus, CreditCard, BookOpen, MessageCircle, FileText, Scale, Shield, Cookie, Eye, Linkedin, Phone } from 'lucide-react';

type NodeType = 'main' | 'navigation' | 'action' | 'subpage';

interface TreeNode {
  id: string;
  label: string;
  type: NodeType;
  children?: TreeNode[];
  icon?: any;
}

const siteStructure: TreeNode = {
  id: 'home',
  label: 'Accueil',
  type: 'main',
  icon: Home,
  children: [
    {
      id: 'formations',
      label: 'Formations en Alternance',
      type: 'navigation',
      icon: GraduationCap,
      children: [
        { id: 'tssr', label: 'TSSR', type: 'subpage', icon: FileText },
        { id: 'ais', label: 'AIS', type: 'subpage', icon: FileText }
      ]
    },
    {
      id: 'admissions',
      label: 'Admissions',
      type: 'navigation',
      icon: UserPlus,
      children: [
        { id: 'conditions', label: 'Conditions', type: 'subpage', icon: FileText },
        { id: 'dossier', label: 'Dossier CPF / OPCO', type: 'subpage', icon: FileText },
        { id: 'alternance', label: 'Alternance', type: 'subpage', icon: FileText }
      ]
    },
    {
      id: 'financement',
      label: 'Financement',
      type: 'navigation',
      icon: CreditCard,
      children: [
        { id: 'cpf', label: 'CPF', type: 'subpage', icon: FileText },
        { id: 'opco', label: 'OPCO', type: 'subpage', icon: FileText }
      ]
    },
    {
      id: 'ressources',
      label: 'Ressources',
      type: 'navigation',
      icon: BookOpen
    },
    {
      id: 'contact',
      label: 'Contact',
      type: 'navigation',
      icon: MessageCircle
    }
  ]
};

const ctaButtons = [
  { id: 'cta-info', label: 'Demander une information', type: 'action' as NodeType, icon: MessageCircle },
  { id: 'cta-rdv', label: 'Prendre rendez-vous', type: 'action' as NodeType, icon: Phone },
  { id: 'cta-discover', label: 'Découvrir les formations', type: 'action' as NodeType, icon: GraduationCap }
];

const footerLinks = [
  { id: 'legal', label: 'Mentions légales', type: 'subpage' as NodeType, icon: Scale },
  { id: 'cgu', label: 'CGU', type: 'subpage' as NodeType, icon: FileText },
  { id: 'cookies', label: 'Politique cookies', type: 'subpage' as NodeType, icon: Cookie },
  { id: 'accessibility', label: 'Accessibilité', type: 'subpage' as NodeType, icon: Eye },
  { id: 'linkedin', label: 'LinkedIn', type: 'action' as NodeType, icon: Linkedin },
  { id: 'contact-footer', label: 'Contact', type: 'action' as NodeType, icon: Phone }
];

const typeColors = {
  main: { bg: 'bg-indigo-600', border: 'border-indigo-700', text: 'text-white', hover: 'hover:bg-indigo-700' },
  navigation: { bg: 'bg-teal-600', border: 'border-teal-700', text: 'text-white', hover: 'hover:bg-teal-700' },
  action: { bg: 'bg-amber-700', border: 'border-amber-800', text: 'text-white', hover: 'hover:bg-amber-800' },
  subpage: { bg: 'bg-slate-600', border: 'border-slate-700', text: 'text-white', hover: 'hover:bg-slate-700' }
};

interface TreeNodeComponentProps {
  node: TreeNode;
  level?: number;
}

function TreeNodeComponent({ node, level = 0 }: TreeNodeComponentProps) {
  const [isExpanded, setIsExpanded] = useState(level === 0);
  const hasChildren = node.children && node.children.length > 0;
  const colors = typeColors[node.type];
  const Icon = node.icon;

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: level * 0.1 }}
        className="flex flex-col items-center"
      >
        <button
          onClick={() => hasChildren && setIsExpanded(!isExpanded)}
          className={`
            ${colors.bg} ${colors.border} ${colors.text} ${colors.hover}
            px-6 py-3 rounded-lg font-medium shadow-lg
            transition-all duration-200 transform hover:scale-105
            border-2 flex items-center gap-2 min-w-[180px] justify-center
            ${hasChildren ? 'cursor-pointer' : 'cursor-default'}
          `}
        >
          {Icon && <Icon className="w-5 h-5" />}
          <span>{node.label}</span>
          {hasChildren && (
            <motion.div
              animate={{ rotate: isExpanded ? 0 : -90 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4 ml-1" />
            </motion.div>
          )}
        </button>

        {hasChildren && isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8 flex flex-col items-center"
          >
            {/* Vertical line */}
            <div className="w-0.5 h-8 bg-slate-300 mb-4" />

            <div className="flex gap-6 flex-wrap justify-center">
              {node.children?.map((child, index) => (
                <div key={child.id} className="relative flex flex-col items-center">
                  {/* Connecting line */}
                  {node.children && node.children.length > 1 && (
                    <div className="absolute -top-12 left-1/2 w-0.5 h-12 bg-slate-300" />
                  )}
                  <TreeNodeComponent node={child} level={level + 1} />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export function SiteHierarchy() {
  return (
    <div className="space-y-16">
      {/* Main hierarchy */}
      <div className="bg-white rounded-2xl shadow-xl p-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">
          Navigation Principale
        </h2>
        <TreeNodeComponent node={siteStructure} />
      </div>

      {/* CTA Buttons */}
      <div className="bg-white rounded-2xl shadow-xl p-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">
          Actions Prioritaires
        </h2>
        <div className="flex gap-6 justify-center flex-wrap">
          {ctaButtons.map((cta) => {
            const colors = typeColors[cta.type];
            const Icon = cta.icon;
            return (
              <motion.button
                key={cta.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className={`
                  ${colors.bg} ${colors.border} ${colors.text} ${colors.hover}
                  px-6 py-3 rounded-lg font-medium shadow-lg
                  border-2 flex items-center gap-2 min-w-[220px] justify-center
                `}
              >
                {Icon && <Icon className="w-5 h-5" />}
                <span>{cta.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Footer Links */}
      <div className="bg-white rounded-2xl shadow-xl p-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">
          Pied de Page
        </h2>
        <div className="flex gap-4 justify-center flex-wrap">
          {footerLinks.map((link) => {
            const colors = typeColors[link.type];
            const Icon = link.icon;
            return (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className={`
                  ${colors.bg} ${colors.border} ${colors.text} ${colors.hover}
                  px-5 py-2.5 rounded-lg font-medium shadow-md
                  border-2 flex items-center gap-2 text-sm
                `}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{link.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 text-center">
          Légende
        </h3>
        <div className="flex gap-6 justify-center flex-wrap">
          {Object.entries(typeColors).map(([type, colors]) => (
            <div key={type} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded ${colors.bg} ${colors.border} border-2`} />
              <span className="text-sm text-slate-600 capitalize">
                {type === 'main' && 'Page principale'}
                {type === 'navigation' && 'Rubriques navigation'}
                {type === 'action' && 'Action prioritaire'}
                {type === 'subpage' && 'Sous-pages'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
