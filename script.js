// =========================================
// STORAGE KEY
// =========================================
const STORAGE_KEY = "tsmAccountingData";
const ACCOUNT_KEY = "tsmAccountList";


// =========================================
// DEFAULT ACCOUNT LIST
// =========================================
const defaultAccounts = [
  "KAS DI TANGAN",
  "KAS DI BANK",
  "HUTANG",
  "PENJUALAN",
  "RETURN PENJUALAN",
  "UANG TITIPAN PENJUALAN TABUNG GAS",
  "BIAYA LISTRIK",
  "BIAYA TELEPHONE DAN INTERNET",
  "BIAYA GAJI",
  "BIAYA JASA PEST CONTROL",
  "BIAYA BENSIN KENDARAAN OPRATIONAL",
  "BIAYA EKSPEDISI-IN",
  "BIAYA EKSPEDISI-OUT",
  "BIAYA AMBIL GULA",
  "BIAYA CONSUMABLE",
  "BIAYA BAHAN BAKU KEMASAN (KARTON DAN SHRINK)",
  "BIAYA BAHAN BAKU GULA",
  "BIAYA BAHAN KEMAS STICKER",
  "BIAYA BAHAN BAKU GAS",
  "BIAYA BAHAN BAKU TAPIOKA",
  "BIAYA BAHAN BAKU FLAVOUR",
  "BIAYA BAHAN PENCUCI",
  "BIAYA PERLENGKAPAN MARKETING",
  "BIAYA PERLENGKAPAN PRODUKSI",
  "BIAYA ADM BANK DAN KARTU",
  "BIAYA JASA DAN SERVICE LAINNYA",
  "BIAYA SERVIS KENDARAAN",
  "BIAYA ATK",
  "BIAYA SEWA HOSTING WEB DAN EMAIL",
  "BIAYA BARCODE TAHUNAN",
  "BIAYA BARCODE 3 TAHUNAN",
  "BIAYA SERTIFIKASI HALAL",
  "BIAYA IZIN MD",
  "BIAYA SERTIFIKASI BPOM",
  "BIAYA ANALISA PRODUK",
  "BIAYA TRIAL PRODUK",
  "BIAYA PAJAK IMPOR",
  "BIAYA SAMPEL MARKETING",
  "BIAYA SAMPEL TES PRODUK",
  "BEBAN REJECT PRODUKSI",
  "BIAYA PERJALANAN DINAS",
  "BIAYA CEK KESEHATAN",
  "BIAYA PAJAK FINAL",
  "BIAYA BAHAN BAKU SODA ASH LIGHT",
  "BIAYA PELATIHAN KARYAWAN",
  "BIAYA PEMBELIAN CUP",
  "BIAYA PEMBELIAN LID CUP",
  "BIAYA TRANSFER BANK",
  "BIAYA MAINTANANCE",
  "BIAYA AKOMODASI TEKNISI",
  "BIAYA CODING HOT FOIL",
  "BIAYA PEMBELIAN BOX",
  "MODAL",
  "PIUTANG",
  "UANG TITIPAN PENJUALAN GULA",
  "DISKON PENJUALAN",
  "UANG MUKA PENJUALAN",
  "PAJAK BUMI DAN BANGUNAN",
  "KEBUTUHAN MAINTNANCE DAN AKOMODASI",
  "KEBUTUHAN INVESTASI",
  "PENJUALAN CINCAU PLAIN",
  "BIAYA SERAGAM",
  "BIAYA PARKIR"
];


// =========================================
// DATA
// =========================================
let transactions =
  JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

let accountList =
  JSON.parse(localStorage.getItem(ACCOUNT_KEY)) || defaultAccounts;


// =========================================
// DOM
// =========================================
const transactionModal =
  document.getElementById("transactionModal");

const accountModal =
  document.getElementById("accountModal");

const transactionForm =
  document.getElementById("transactionForm");

const accountForm =
  document.getElementById("accountForm");

const akunSelect =
  document.getElementById("akun");

const tbody =
  document.querySelector("#dataTable tbody");

const totalSaldoElement =
  document.getElementById("totalSaldo");

const totalDebitElement =
  document.getElementById("totalDebit");

const totalKreditElement =
  document.getElementById("totalKredit");


// =========================================
// AUTO DATE
// =========================================
function setTodayDate() {

  const today = new Date();

  const year = today.getFullYear();

  const month =
    String(today.getMonth() + 1).padStart(2, "0");

  const day =
    String(today.getDate()).padStart(2, "0");

  document.getElementById(
    "tanggal"
  ).value = `${year}-${month}-${day}`;

}


// =========================================
// FORMAT RUPIAH
// =========================================
function formatRupiah(number) {

  return "Rp " +
    Number(number).toLocaleString("id-ID");

}


// =========================================
// SAVE DATA
// =========================================
function saveTransactions() {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(transactions)
  );

}


function saveAccounts() {

  localStorage.setItem(
    ACCOUNT_KEY,
    JSON.stringify(accountList)
  );

}


// =========================================
// RENDER ACCOUNT DROPDOWN
// =========================================
function renderAccountDropdown() {

  akunSelect.innerHTML = `
    <option value="">
      Pilih Nama Akun
    </option>
  `;

  accountList.forEach((account) => {

    const option =
      document.createElement("option");

    option.value = account;

    option.textContent = account;

    akunSelect.appendChild(option);

  });

}
// =========================================
// OPEN MODAL
// =========================================
function openModal() {

  transactionModal.style.display = "flex";

  setTodayDate();

}


function closeModal() {

  transactionModal.style.display = "none";

  transactionForm.reset();

}


// =========================================
// OPEN ACCOUNT MODAL
// =========================================
function openAccountModal() {

  accountModal.style.display = "flex";

}


function closeAccountModal() {

  accountModal.style.display = "none";

  accountForm.reset();

}


// =========================================
// ADD NEW ACCOUNT
// =========================================
accountForm.addEventListener(
  "submit",
  function (e) {

    e.preventDefault();

    const namaAkunBaru = document
      .getElementById("namaAkunBaru")
      .value
      .trim()
      .toUpperCase();

    if (!namaAkunBaru) {

      alert("Nama akun wajib diisi!");

      return;

    }

    const isExist =
      accountList.includes(namaAkunBaru);

    if (isExist) {

      alert("Nama akun sudah tersedia!");

      return;

    }

    accountList.push(namaAkunBaru);

    accountList.sort();

    saveAccounts();

    renderAccountDropdown();

    alert("Akun berhasil ditambahkan");

    closeAccountModal();

  }
);


// =========================================
// ADD TRANSACTION
// =========================================
transactionForm.addEventListener(
  "submit",
  function (e) {

    e.preventDefault();

    const tanggal =
      document.getElementById("tanggal").value;

    const akun =
      document.getElementById("akun").value;

    const keterangan = document
      .getElementById("keterangan")
      .value
      .trim();

    const debit =
      parseInt(
        document.getElementById("debit").value
      ) || 0;

    const kredit =
      parseInt(
        document.getElementById("kredit").value
      ) || 0;


    // VALIDATION
    if (!tanggal || !akun || !keterangan) {

      alert("Lengkapi data transaksi!");

      return;

    }

    if (debit <= 0 && kredit <= 0) {

      alert(
        "Debit atau kredit wajib diisi!"
      );

      return;

    }

    if (debit > 0 && kredit > 0) {

      alert(
        "Isi salah satu: debit atau kredit!"
      );

      return;

    }


    // TRANSACTION OBJECT
    const transaction = {

      id: Date.now(),

      tanggal,

      akun,

      keterangan,

      debit,

      kredit

    };


    // SAVE
    transactions.push(transaction);

    saveTransactions();

    renderTransactions();

    updateDashboard();

    closeModal();

  }
);


// =========================================
// RENDER TABLE
// =========================================
function renderTransactions() {

  tbody.innerHTML = "";

  if (transactions.length === 0) {

    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="empty-data">
          Belum ada transaksi
        </td>
      </tr>
    `;

    return;

  }


  transactions.forEach((item, index) => {

    const tr =
      document.createElement("tr");

    tr.innerHTML = `
      <td>${item.tanggal}</td>

      <td>${item.akun}</td>

      <td>${item.keterangan}</td>

      <td>
        ${
          item.debit > 0
            ? formatRupiah(item.debit)
            : "-"
        }
      </td>

      <td>
        ${
          item.kredit > 0
            ? formatRupiah(item.kredit)
            : "-"
        }
      </td>

      <td>

        <button
          class="delete-btn"
          onclick="deleteTransaction(${index})"
        >
          Hapus
        </button>

      </td>
    `;

    tbody.appendChild(tr);

  });

}
// =========================================
// DELETE TRANSACTION
// =========================================
function deleteTransaction(index) {

  const confirmDelete = confirm(
    "Yakin ingin menghapus transaksi ini?"
  );

  if (!confirmDelete) return;

  transactions.splice(index, 1);

  saveTransactions();

  renderTransactions();

  updateDashboard();

}


// =========================================
// UPDATE DASHBOARD
// =========================================
function updateDashboard() {

  let totalDebit = 0;

  let totalKredit = 0;

  transactions.forEach((item) => {

    totalDebit += item.debit;

    totalKredit += item.kredit;

  });

  const totalSaldo =
    totalDebit - totalKredit;

  totalSaldoElement.textContent =
    formatRupiah(totalSaldo);

  totalDebitElement.textContent =
    formatRupiah(totalDebit);

  totalKreditElement.textContent =
    formatRupiah(totalKredit);

}


// =========================================
// EXPORT PDF
// =========================================
function exportPDF() {

  if (transactions.length === 0) {

    alert("Belum ada data transaksi!");

    return;

  }

  const doc =
    new window.jspdf.jsPDF(
      "p",
      "mm",
      "a4"
    );


  // TOTAL
  let totalDebit = 0;

  let totalKredit = 0;

  transactions.forEach((item) => {

    totalDebit += item.debit;

    totalKredit += item.kredit;

  });

  const totalSaldo =
    totalDebit - totalKredit;


  // HEADER
  doc.setFontSize(18);

  doc.text(
    "PT. TUNAS SARI MULIA",
    14,
    18
  );

  doc.setFontSize(11);

  doc.text(
    "Accounting Dashboard",
    14,
    25
  );

  doc.text(
    `Export : ${new Date().toLocaleString("id-ID")}`,
    14,
    32
  );


  // TABLE
  doc.autoTable({

    startY: 40,

    head: [[
      "No",
      "Tanggal",
      "Akun",
      "Keterangan",
      "Debit",
      "Kredit"
    ]],

    body: transactions.map(
      (item, index) => [

        index + 1,

        item.tanggal,

        item.akun,

        item.keterangan,

        item.debit > 0
          ? formatRupiah(item.debit)
          : "-",

        item.kredit > 0
          ? formatRupiah(item.kredit)
          : "-"

      ]
    ),

    styles: {
      fontSize: 8
    },

    headStyles: {
      fillColor: [7, 23, 57]
    },

    theme: "grid"

  });


  // SUMMARY
  doc.autoTable({

    startY:
      doc.lastAutoTable.finalY + 8,

    theme: "plain",

    styles: {
      fontSize: 11
    },

    body: [

      [
        "Total Debit",
        formatRupiah(totalDebit)
      ],

      [
        "Total Kredit",
        formatRupiah(totalKredit)
      ],

      [
        "Total Saldo",
        formatRupiah(totalSaldo)
      ]

    ]

  });


  // SAVE PDF
  doc.save(
    "Laporan_Accounting_TSM.pdf"
  );

}


// =========================================
// CLOSE MODAL WHEN CLICK OUTSIDE
// =========================================
window.addEventListener(
  "click",
  function (e) {

    if (e.target === transactionModal) {

      closeModal();

    }

    if (e.target === accountModal) {

      closeAccountModal();

    }

  }
);


// =========================================
// INIT
// =========================================
renderAccountDropdown();

renderTransactions();

updateDashboard();
