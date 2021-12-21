import CountryData from "./CountryData";

const CountryList = ({ listOfItems, setNewValue }) => {
  return (
    <div>
      {listOfItems.length === 1 ? (
        <CountryData countryData={listOfItems[0]} />
      ) : (
        <div>
          {listOfItems.map((item, index) => {
            return (
              <div key={index}>
                {item.name.common}{" "}
                <button onClick={() => setNewValue(item.name.common)}>
                  show
                </button>{" "}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CountryList;
