export default function HomeKeyframes() {
  return (
    <style>{`
      @keyframes flow-dot {
        0%, 5% { top: 0%; }
        20%, 25% { top: 22%; }
        40%, 45% { top: 44%; }
        60%, 65% { top: 66%; }
        80%, 100% { top: 88%; }
      }

      @keyframes outcome-bar {
        0%   { width: 20%; }
        40%  { width: 55%; }
        80%  { width: 85%; }
        100% { width: 20%; }
      }

      .flow-dot {
        animation: flow-dot 16s ease-in-out infinite;
        transform: translateX(0%);
      }

      .outcome-bar {
        animation: outcome-bar 14s ease-in-out infinite;
      }
    `}</style>
  );
}