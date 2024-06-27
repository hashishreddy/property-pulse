import PropertyCard from "@/components/PropertyCard";
import properties from "@/properties.json";
const PropertiesPage = () => {
  return (
    <div>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key = {property._id} property = {property}/>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertiesPage;
