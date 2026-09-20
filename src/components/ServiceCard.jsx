import React from 'react';

function ServiceCard({ title, image, tag, description, ariaHidden = false }) {
  return (
    <div className="carousel-card w-[290px] sm:w-[340px] lg:w-[380px] flex-shrink-0 group" aria-hidden={ariaHidden}>
      <div className="luxury-card-border transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-[#E5C07B]/20">
        <div className="glass-card rounded-[23px] overflow-hidden flex flex-col h-[490px] sm:h-[540px]">
          {/*  85% Image Area  */}
          <div className="relative h-[85%] w-full overflow-hidden bg-slate-900">
            <img src={image} alt={title} className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090D18] via-transparent to-black/20"></div>
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#E5C07B]/30 text-[11px] tracking-wider text-[#FBE8B5] uppercase font-medium">
              {tag}
            </div>
          </div>
          {/*  15% Service Name & Details  */}
          <div className="h-[15%] w-full px-6 flex items-center justify-between bg-gradient-to-b from-[#090D18] to-[#05070E]">
            <div>
              <h3 className="font-serifHeading text-xl sm:text-2xl font-bold text-white group-hover:text-[#FBE8B5] transition-colors">
                {title}
              </h3>
              <p className="text-[11px] text-slate-400 tracking-wide">{description}</p>
            </div>
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-slate-300 group-hover:border-[#E5C07B] group-hover:text-[#E5C07B] transition-colors">
              ↗
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
