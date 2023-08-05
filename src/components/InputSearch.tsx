interface IProps {
    btnColor?: string;
}

export default function SearchBar({
    btnColor
}: IProps) {
  return (
    <div className="join">
      <div>
        <input className="input join-item w-full md:w-[280px]" placeholder="Cari..." />
      </div>
      <div className="indicator">
        <button className={`btn ${btnColor} join-item`}>Cari</button>
      </div>
    </div>
  );
}
