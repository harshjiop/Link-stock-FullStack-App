export default function ThemePreview({ name, previewStyles, className = "", eventHandler }) {
  return (
    <div
      className={`innerSection ${className}`}
      style={previewStyles?.innerSection}
      onClick={eventHandler}
    >
      <div className="filter" style={previewStyles?.filter}></div>
      <h1 className="themeName" style={previewStyles?.themeName}>
        {name}
      </h1>
    </div>
  );
}

  // const TestThemesList = [
  //   {
  //     _id: 'checkmate',
  //     name: 'Default',
  //     previewStyles: {
  //       innerSection: {
  //         border:'3px solid #28BDD1',
  //         height:'80px',
  //         width:'120px',
  //         color:'white',
  //         display:'flex',
  //         justifyContent:'center',
  //         alignItems:'center',
  //         borderRadius:'8px',
  //         backgroundColor:'#171C2F'
  //       },
  //       filter: {},
  //     }
  //   }
  // ]