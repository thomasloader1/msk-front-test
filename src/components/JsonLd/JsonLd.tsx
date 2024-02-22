
const JsonLd = ({ children  }:any) => {
  return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(children) }}
      />
  );
};

export default JsonLd;

