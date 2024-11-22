export default function HtmlContent({ htmlString }) {
  return (
    <p className="text-muted"
      dangerouslySetInnerHTML={{ __html: htmlString }}
    />
  );
};