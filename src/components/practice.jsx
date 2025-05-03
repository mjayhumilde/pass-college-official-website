const ShadowCard = ({ children }) => {
  return (
    <div className="relative w-full">
      {/* Shadow element positioned behind the main card */}
      <div className="absolute w-full h-full bg-red-primary translate-x-2 translate-y-2 shadow-lg"></div>

      {/* Main card */}
      <div className="relative w-full h-full bg-white z-10">{children}</div>
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
//             <img className="w-full h-full object-cover" src={img} alt={title} />
//           </div>
//           <div className="p-4">
//             <h2 className="text-red-primary text-lg font-medium mb-2">
//               {title}
//             </h2>
//             <p className="text-red-950 text-sm">{description}</p>
//           </div>
//         </div>
//       </ShadowCard>
//     </div>
//   );
// };
