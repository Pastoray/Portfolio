// Re-mounts on every navigation, giving each route a soft fade-up entrance.
export default function Template({ children }) {
  return <div className="animate-rise">{children}</div>;
}
