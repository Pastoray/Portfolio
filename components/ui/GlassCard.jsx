export default function GlassCard({ as: Tag = "div", hover = false, className = "", ...props }) {
  return <Tag className={`glass rounded-2xl ${hover ? "glass-hover" : ""} ${className}`} {...props} />;
}
