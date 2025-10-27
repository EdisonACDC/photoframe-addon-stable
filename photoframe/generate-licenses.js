#!/usr/bin/env node

/**
 * PhotoFrame PRO - Generatore Codici Licenza
 * 
 * Questo script genera codici licenza validi per PhotoFrame PRO (€5,50)
 * Formato: PRO-2025-XXXX-YYYY
 * 
 * Uso:
 *   node generate-licenses.js 10          # Genera 10 codici
 *   node generate-licenses.js custom ABC123  # Genera codice specifico
 */

const SECRET_SALT = "PhotoFrame-PRO-v1-2025-Marius";

function calculateChecksum(code) {
  const combined = code + SECRET_SALT;
  let hash = 0;
  
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  const checksum = Math.abs(hash).toString(36).toUpperCase().padStart(4, '0').slice(-4);
  return checksum;
}

function generateLicenseKey(code) {
  const cleanCode = code.toUpperCase().slice(0, 4).padEnd(4, '0');
  const checksum = calculateChecksum(cleanCode);
  return `PRO-2025-${cleanCode}-${checksum}`;
}

function generateRandomCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function main() {
  const args = process.argv.slice(2);
  
  console.log('\n🔑 PhotoFrame PRO - Generatore Licenze €5,50\n');
  console.log('=' .repeat(50));
  
  if (args.length === 0) {
    console.log('\nUso:');
    console.log('  node generate-licenses.js 10           # Genera 10 codici casuali');
    console.log('  node generate-licenses.js custom ABC123 # Genera codice specifico\n');
    return;
  }
  
  if (args[0] === 'custom' && args[1]) {
    const license = generateLicenseKey(args[1]);
    console.log('\n✅ Codice Personalizzato Generato:\n');
    console.log(`   ${license}\n`);
    console.log(`Questo codice può essere venduto per €5,50 su Gumroad/Ko-fi\n`);
  } else {
    const count = parseInt(args[0]) || 5;
    console.log(`\n✅ ${count} Codici Licenza Generati:\n`);
    
    const licenses = [];
    for (let i = 0; i < count; i++) {
      const code = generateRandomCode();
      const license = generateLicenseKey(code);
      licenses.push(license);
      console.log(`   ${i + 1}. ${license}`);
    }
    
    console.log(`\n💰 Valore Totale: €${(count * 5.5).toFixed(2)}`);
    console.log(`   (dopo commissioni Gumroad 10%: €${(count * 5.5 * 0.9).toFixed(2)})\n`);
  }
  
  console.log('=' .repeat(50));
  console.log('\n📝 Istruzioni Vendita:');
  console.log('   1. Carica su Gumroad come "PhotoFrame PRO License"');
  console.log('   2. Prezzo: €5,50');
  console.log('   3. Invia il codice al cliente dopo il pagamento');
  console.log('   4. Cliente inserisce il codice nell\'app per attivare PRO\n');
}

main();
