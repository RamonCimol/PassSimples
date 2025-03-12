document.addEventListener('DOMContentLoaded', () => {
  const copiarBtn = document.getElementById("copiar");
  const novaSenhaBtn = document.getElementById("nova-senha");
  const senhaDisplay = document.getElementById("senha");
  const baixarBtn = document.getElementById("baixar-senha");
  const tamanhoSenhaInput = document.getElementById("tamanho-senha");
  const valorTamanho = document.getElementById("valor-tamanho");
  const diminuirBtn = document.getElementById("diminuir");
  const aumentarBtn = document.getElementById("aumentar");
  const voltarSenhaBtn = document.getElementById("voltar-senha");
  const whatsappBtn = document.getElementById("whatsapp");

  let historicoSenhas = [];
  let indiceSenhaAtual = -1;

  // Atualiza o valor exibido do tamanho da senha
  tamanhoSenhaInput.addEventListener('input', () => {
    valorTamanho.textContent = tamanhoSenhaInput.value;
  });

  diminuirBtn.addEventListener('click', () => atualizarTamanho(-1));
  aumentarBtn.addEventListener('click', () => atualizarTamanho(1));

  function atualizarTamanho(incremento) {
    let novoValor = parseInt(tamanhoSenhaInput.value) + incremento;
    novoValor = Math.max(tamanhoSenhaInput.min, Math.min(tamanhoSenhaInput.max, novoValor));
    tamanhoSenhaInput.value = novoValor;
    valorTamanho.textContent = novoValor;
  }

  function gerarSenha() {
    let senha = "";
    const tamanho = parseInt(tamanhoSenhaInput.value); // Tamanho dinâmico da senha
    const caracteresMaiusculos = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const caracteresMinusculos = "abcdefghijklmnopqrstuvwxyz";
    const numeros = "0123456789";
    const simbolos = "!@#$%&*_|+-?";

    let caracteresDisponiveis = caracteresMaiusculos + caracteresMinusculos + numeros + simbolos;

    for (let i = 0; i < tamanho; i++) {
      senha += caracteresDisponiveis.charAt(Math.floor(Math.random() * caracteresDisponiveis.length));
    }

    senhaDisplay.value = senha;
    historicoSenhas.push(senha);
    indiceSenhaAtual = historicoSenhas.length - 1;
  }

  novaSenhaBtn.addEventListener('click', gerarSenha);
  voltarSenhaBtn.addEventListener('click', voltarSenha);

  copiarBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(senhaDisplay.value)
      .then(() => alert("Senha copiada com sucesso!"))
      .catch(err => alert("Falha ao copiar: " + err));
  });

  baixarBtn.addEventListener('click', () => {
    const blob = new Blob([senhaDisplay.value], { type: "text/plain" });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "senha.txt";
    link.click();
  });

  whatsappBtn.addEventListener('click', () => {
    const senhaGerada = senhaDisplay.value;
    const mensagem = `Aqui está sua senha gerada: *${senhaGerada}*. Lembre-se de mantê-la segura!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(mensagem)}`, "_blank");
  });

  function voltarSenha() {
    if (indiceSenhaAtual > 0) {
      indiceSenhaAtual--;
      senhaDisplay.value = historicoSenhas[indiceSenhaAtual];
    } else {
      alert("Não há mais senhas anteriores!");
    }
  }

  gerarSenha();
});
