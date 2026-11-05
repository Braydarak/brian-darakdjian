import BrianReal from "../../assets/brian-real.jpeg";

const RealPhoto = ({ className = "" }: { className?: string }) => (
  <img
    src={BrianReal}
    alt=""
    aria-hidden="true"
    loading="lazy"
    className={`pointer-events-none absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-[transform,opacity,border-color,background-color,color] duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 group-data-[real=true]:scale-100 group-data-[real=true]:opacity-100 ${className}`}
  />
);

export default RealPhoto;
