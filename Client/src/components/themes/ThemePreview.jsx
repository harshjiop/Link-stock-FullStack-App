export default function ThemePreview({name, previewStyles, className = "",eventHandler }) {
  return (
    <div
      className={`innerSection ${className}`}
      style={previewStyles.innerSection}
      onClick={eventHandler}
    >
      <div className="filter" style={previewStyles.filter}></div>
      <h1 className="themeName" style={previewStyles.themeName}>
        {name}
      </h1>
    </div>
  );
}
