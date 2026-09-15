import { create } from 'zustand';
import { sound } from '../audio/soundEngine';

interface PortfolioState {
  activeProjectId: string | null;
  preloaderComplete: boolean;
  soundEnabled: boolean;
  mobileMenuOpen: boolean;
  hoveredProjectId: string | null;
  cursorPosition: { x: number; y: number };
  
  setActiveProject: (id: string | null) => void;
  setPreloaderComplete: (complete: boolean) => void;
  toggleSound: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  setHoveredProject: (id: string | null) => void;
  setCursorPosition: (pos: { x: number; y: number }) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  activeProjectId: null,
  preloaderComplete: false,
  soundEnabled: false,
  mobileMenuOpen: false,
  hoveredProjectId: null,
  cursorPosition: { x: 0, y: 0 },

  setActiveProject: (id) => {
    sound.play('whoosh');
    set({ activeProjectId: id });
    window.scrollTo({ top: 0, behavior: 'instant' });
  },

  setPreloaderComplete: (complete) => set({ preloaderComplete: complete }),

  toggleSound: () => {
    const isMuted = sound.toggleMute();
    set({ soundEnabled: !isMuted });
  },

  setMobileMenuOpen: (open) => {
    sound.play('click');
    set({ mobileMenuOpen: open });
  },

  setHoveredProject: (id) => set({ hoveredProjectId: id }),

  setCursorPosition: (pos) => set({ cursorPosition: pos })
}));
