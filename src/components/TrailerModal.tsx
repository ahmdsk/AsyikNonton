import { IMovie } from "@/interface/Movie";

interface IProps {
  movie: IMovie;
}

export default function TrailerModal({ movie }: IProps) {
  movie.trailer = movie.trailer?.replace("watch?v=", "embed/");

  return (
    <dialog id="my_modal_1" className="modal">
      <form method="dialog" className="modal-box space-y-2 h-[400px]">
        <h3 className="font-bold text-lg">Trailer: {movie.title}</h3>

        <iframe className="w-full h-3/4" src={movie.trailer ?? ""}></iframe>

        <div className="modal-action">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn">Tutup</button>
        </div>
      </form>
    </dialog>
  );
}
