const ShadowCard = ({ children }) => {
  return (
    <div className="relative w-full">
      {/* Shadow element positioned behind the main card */}
      <div className="absolute w-full h-full translate-x-2 translate-y-2 shadow-lg bg-red-primary"></div>

      {/* Main card */}
      <div className="relative z-10 w-full h-full bg-white">{children}</div>
    </div>
  );
};

export default ShadowCard;

// Example usage
// const CardExample = ({ img, title, description }) => {
//   return (
//     <div className="w-full">
//       <ShadowCard>
//         <div>
//           <div className="w-full h-[400px] overflow-hidden">
//             <img className="object-cover w-full h-full" src={img} alt={title} />
//           </div>
//           <div className="p-4">
//             <h2 className="mb-2 text-lg font-medium text-red-primary">
//               {title}
//             </h2>
//             <p className="text-sm text-red-950">{description}</p>
//           </div>
//         </div>
//       </ShadowCard>
//     </div>
//   );
// };
