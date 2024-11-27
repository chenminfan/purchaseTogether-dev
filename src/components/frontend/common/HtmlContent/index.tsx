export default function HtmlContent({ htmlString, className }) {
  return (
    <p className={`text-muted ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlString }}
    />
  );
};