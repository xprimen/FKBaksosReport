import React from "react";

type Props = {
  data: any[];
};

const TableAnggota = ({ data }: Props) => {
  return (
    <table className="table table-zebra" id="table-anggota">
      <thead>
        <tr>
          <th>No</th>
          <th>Nama</th>
          <th>Mawil</th>
        </tr>
      </thead>
      <tbody>
        {data.length &&
          data.map((d, i) => (
            <tr key={String(i)}>
              <td>{d.nomor.toString().padStart(3, "0")}</td>
              <td>{d.nama}</td>
              <td>{d.mawil}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default TableAnggota;
