export const responseSuccessWithData = (data: any) => ({ data });
export const responseSuccessWithMessage = (
  message: string = "Yeay... Permintaan Berhasil Dikirimkan"
) => ({ message });

export const responseErrorWithMessage = (
  message: string = "Yahh... Sepertinya terjadi masalah pada server"
) => ({ message });
