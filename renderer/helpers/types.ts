export type TAnggota = {
  nomor: string;
  nama: string;
  mawil: string;
  dateCreated: number;
  dateUpdated: number;
};
export type TTransaksi = {
  seq: number;
  nomor: string;
  nama: string;
  mawil: string;
  iuran_terakhir?: number | null;
  tgl_iuran: string;
  jumlah: number;
  keterangan: string;
};
export type MainData = {
  anggota: {
    data: TAnggota[];
    loading: boolean;
    error: string;
    selectedId: string | null;
  };
  transaksi: {
    data: TTransaksi[];
    loading: boolean;
    error: string;
    title: string;
  };
};
