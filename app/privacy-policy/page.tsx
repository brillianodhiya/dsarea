import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-100 font-sans leading-normal tracking-normal">
      <div className="container mx-auto my-8 p-8 bg-white rounded shadow-lg">
        <h1 className="text-4xl font-bold mb-2">
          Kebijakan Privasi untuk portal.dsarea.com
        </h1>
        <h2 className="text-2xl font-bold mt-4 mb-2">Pengantar:</h2>
        <p className="mb-4">
          Selamat datang di portal.dsarea.com. Privasi Anda sangat penting bagi
          kami dan kebijakan privasi ini menjelaskan bagaimana kami
          mengumpulkan, menggunakan, memproses, dan melindungi informasi yang
          Anda berikan saat menggunakan layanan kami.
        </p>

        <h2 className="text-2xl font-bold mt-4 mb-2">Pengumpulan Informasi:</h2>
        <p className="mb-4">
          Kami mengumpulkan informasi yang Anda berikan secara langsung kepada
          kami saat mendaftar, membeli, atau berpartisipasi dalam try out di
          situs kami. Informasi ini mungkin termasuk, tapi tidak terbatas pada,
          nama, alamat email, nomor telepon, dan detail pembayaran.
        </p>

        <h2 className="text-2xl font-bold mt-4 mb-2">Penggunaan Informasi:</h2>
        <p className="mb-4">Informasi yang kami kumpulkan digunakan untuk:</p>
        <ul className="list-disc pl-5 mb-4">
          <li>Memproses transaksi Anda.</li>
          <li>Mengirimkan notifikasi tentang try out atau produk baru.</li>
          <li>Meningkatkan layanan dan dukungan pelanggan kami.</li>
          <li>
            Melakukan analisis internal atau penelitian pasar untuk meningkatkan
            produk dan layanan kami.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-4 mb-2">Berbagi Informasi:</h2>
        <p className="mb-4">
          Kami tidak menjual, menukar, atau menyewakan informasi pribadi Anda
          kepada pihak ketiga. Kami mungkin berbagi informasi dengan pihak
          ketiga untuk tujuan operasional, seperti pemrosesan pembayaran atau
          pengiriman email.
        </p>

        <h2 className="text-2xl font-bold mt-4 mb-2">Keamanan:</h2>
        <p className="mb-4">
          Kami berkomitmen untuk memastikan bahwa informasi Anda aman. Untuk
          mencegah akses atau pengungkapan yang tidak sah, kami telah
          menempatkan prosedur fisik, elektronik, dan manajerial yang sesuai
          untuk menjaga dan mengamankan informasi yang kami kumpulkan online.
        </p>

        <h2 className="text-2xl font-bold mt-4 mb-2">Hak Anda:</h2>
        <p className="mb-4">
          Anda memiliki hak untuk mengakses, mengoreksi, atau menghapus
          informasi pribadi Anda yang kami simpan. Jika Anda ingin melaksanakan
          hak ini, silakan hubungi kami melalui informasi kontak yang disediakan
          di situs web kami.
        </p>

        <h2 className="text-2xl font-bold mt-4 mb-2">
          Perubahan pada Kebijakan Privasi:
        </h2>
        <p className="mb-4">
          Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Kami
          akan memberitahu Anda tentang perubahan yang signifikan melalui email
          atau melalui pemberitahuan di situs web kami.
        </p>

        <h2 className="text-2xl font-bold mt-4 mb-2">Kontak:</h2>
        <p className="mb-4">
          Jika Anda memiliki pertanyaan atau kekhawatiran tentang kebijakan
          privasi ini, silakan hubungi kami melalui{" "}
          <a
            href="mailto:info@dsarea.com"
            className="text-blue-500 hover:text-blue-700"
          >
            info@dsarea.com
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
