<script>
  import { onMount } from 'svelte';
  import { io } from 'socket.io-client';

  // State Konten File
  let hostsContent = "[router]\nR1 ansible_host=192.168.10.1\nansible_user=admin\nansible_password=admin\n\n[router:vars]\nansible_connection=network_cli\nansible_network_os=routeros";
  let yamlContent = "--- \n- name: Fase 3 Konfigurasi...\n  hosts: all\n  gather_facts: no\n  tasks:\n    - name: 0. Konfigurasi IP\n      community.routeros.command:\n        commands:\n          - /ip address add address={{ new_ip }} interface=ether2";
  
  let alerts = [];
  let status = "SISTEM SIAP";
  let isLoading = false;

  onMount(() => {
    const socket = io('http://localhost:5000');
    socket.on('network-alert', (data) => {
      alerts = [data, ...alerts];
      if(data.type === "SECURITY") {
         setTimeout(() => {
           alerts = alerts.filter(a => a !== data);
         }, 5000);
      }
    });
  });

  async function handleDeploy() {
    isLoading = true;
    status = "SINKRONISASI KE REPOSITORY...";
    try {
      const res = await fetch('http://localhost:5000/api/save-and-deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hosts: hostsContent, yaml: yamlContent })
      });
      status = res.ok ? "PIPELINE BERHASIL DIJALANKAN" : "GAGAL DEPLOY";
    } catch (e) {
      status = "ERROR KONEKSI BACKEND";
    } finally {
      isLoading = false;
    }
  }
</script>

<div class="min-h-screen bg-[#0F172A] text-slate-200 font-sans selection:bg-[#ED1C24]">
  <header class="bg-[#ED1C24] p-4 flex justify-between items-center shadow-2xl border-b-4 border-[#C1121F]">
    <div class="flex items-center gap-4">
      <div class="bg-white px-3 py-1 rounded-sm">
        <span class="text-[#ED1C24] font-black italic text-xl">Telkom</span>
      </div>
      <h1 class="text-white font-bold tracking-widest text-sm uppercase">NetDevOps Control Center</h1>
    </div>
    <div class="flex items-center gap-3">
      <div class="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
      <span class="text-white text-[10px] font-bold tracking-widest uppercase">{status}</span>
    </div>
  </header>

  <div class="fixed top-24 right-6 z-50 space-y-3 w-80">
    {#each alerts.filter(a => a.type === "SECURITY") as alert}
      <div class="bg-white border-l-8 border-[#ED1C24] p-4 shadow-2xl rounded-r-xl animate-bounce-short">
        <p class="text-[10px] font-black text-[#ED1C24] mb-1 uppercase tracking-tighter">Security Alert</p>
        <p class="text-xs font-bold text-slate-800 leading-tight">{alert.message}</p>
        <p class="text-[9px] text-slate-400 mt-2">{alert.time} • Src: {alert.source}</p>
      </div>
    {/each}
  </div>

  <main class="p-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
    
    <div class="lg:col-span-2 space-y-6">
      <div class="bg-[#1E293B] border border-slate-700 rounded-3xl p-8 shadow-xl">
        <div class="border-b border-slate-800 pb-4 mb-6">
            <h3 class="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Live Configuration Editor</h3>
        </div>
        
        <div class="bg-[#0F172A] p-6 rounded-2xl border border-slate-800 flex justify-between items-center mb-8">
          <div>
            <p class="text-white font-bold text-lg italic">MikroTik - Branch R1</p>
            <p class="text-xs text-blue-400 font-mono tracking-widest">ID: TELKOM-R1-2026</p>
          </div>
          <button on:click={handleDeploy} disabled={isLoading} class="bg-[#ED1C24] hover:bg-[#C1121F] px-10 py-3 rounded-xl font-black text-xs text-white uppercase tracking-widest shadow-lg transition-all active:scale-95 disabled:bg-slate-700">
            {isLoading ? 'DEPLOYING...' : 'PUSH CONFIG'}
          </button>
        </div>

        <div class="space-y-6">
          <div class="grid grid-cols-1 gap-6">
            <div class="space-y-2">
              <div class="flex justify-between items-center ml-1">
                <label class="text-[10px] font-bold text-[#ED1C24] uppercase tracking-widest italic">Inventory (hosts.ini)</label>
              </div>
              <textarea bind:value={hostsContent} spellcheck="false" class="w-full h-40 bg-black text-emerald-400 p-5 rounded-2xl font-mono text-[11px] border border-slate-800 focus:border-[#ED1C24] outline-none transition-all shadow-inner custom-scrollbar"></textarea>
            </div>
            
            <div class="space-y-2">
              <div class="flex justify-between items-center ml-1">
                <label class="text-[10px] font-bold text-[#ED1C24] uppercase tracking-widest italic">Playbook (setup_sistem.yml)</label>
              </div>
              <textarea bind:value={yamlContent} spellcheck="false" class="w-full h-72 bg-black text-amber-400 p-5 rounded-2xl font-mono text-[11px] border border-slate-800 focus:border-[#ED1C24] outline-none transition-all shadow-inner custom-scrollbar"></textarea>
            </div>
          </div>

          <button on:click={handleDeploy} class="w-full bg-white text-[#ED1C24] py-4 rounded-xl font-black text-xs uppercase tracking-[0.3em] hover:bg-[#ED1C24] hover:text-white transition-all shadow-xl active:scale-95 border-2 border-white">
            SAVE & SYNC TO REPOSITORY
          </button>
        </div>
      </div>
    </div>

    <div class="bg-[#1E293B] border border-slate-700 rounded-3xl p-8 shadow-xl flex flex-col h-[850px]">
      <div class="border-b border-[#ED1C24] pb-4 mb-6 flex justify-between items-center">
          <h3 class="text-[10px] font-black text-white uppercase tracking-widest italic">Live Log Monitor</h3>
          <span class="text-[9px] text-slate-500 font-mono tracking-tighter italic">Port: 5514</span>
      </div>
      <div class="flex-1 bg-black p-6 rounded-2xl overflow-y-auto font-mono text-[10px] leading-relaxed custom-scrollbar">
        {#each alerts as a}
           <div class="mb-3 border-b border-white/5 pb-2">
             <span class="text-slate-500">[{a.time}]</span>
             <span class={a.type === 'SECURITY' ? 'text-red-500 font-bold' : 'text-emerald-400'}>
                {a.type === 'SECURITY' ? '!! [ALERT]' : '>> [INFO]'}
             </span>
             <p class="text-slate-300 mt-1 pl-2">{a.message}</p>
           </div>
        {:else}
           <p class="text-slate-700 italic text-center mt-20 uppercase tracking-widest opacity-50">Menunggu Log MikroTik...</p>
        {/each}
      </div>
    </div>

  </main>
</div>

<style>
  @keyframes bounce-short {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(-15px); }
  }
  .animate-bounce-short { animation: bounce-short 0.4s ease-in-out; }
  
  .custom-scrollbar::-webkit-scrollbar { width: 4px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: #000; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
</style>