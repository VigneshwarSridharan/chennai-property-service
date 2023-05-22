const Cards = ({ metaData }) => {
  return (
    <section id="stats-counter" className="stats-counter section-bg">
      <div className="container">
        <div className="row gy-4">
          {metaData.map((item, inx) => {
            return (
              <div className="col-lg-3 col-md-6" key={inx}>
                <div className="stats-item d-flex align-items-center w-100 h-100">
                  <i className={`${item.icon} color-blue flex-shrink-0`}></i>
                  <div>
                    <span className="purecounter">{item.label}</span>
                    <p>{item.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Cards;
