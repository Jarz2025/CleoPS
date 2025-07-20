document.addEventListener("DOMContentLoaded", function () {
  console.log("Settings loaded:", window.settings);

  if (!window.settings) {
    console.error("Settings not loaded!");
    alert("Error: Server configuration failed to load!");
    return;
  }

  try {
    const config = window.settings;

    // Mobile menu toggle
    const mobileMenuButton = document.querySelector("nav button");
    if (mobileMenuButton) {
      mobileMenuButton.addEventListener("click", function () {
        const mobileMenu = document.getElementById("mobile-menu");
        if (mobileMenu) {
          mobileMenu.classList.toggle("hidden");
        }
      });
    }

    // Update basic info
    updateBasicInfo(config);
    
    // Update features section
    updateFeatures(config);
    
    // Setup tutorial/app buttons with Windows and Surge 5 support
    setupTutorialButtons(config);
    
    // Update about section
    updateAboutSection(config);
    
    // Update team section
    updateTeamSection(config);
    
    // Update testimonials
    updateTestimonials(config);
    
    // Update community links
    updateCommunityLinks(config);
    
    // Update WhatsApp float button
    const whatsappFloat = document.getElementById("float-whatsapp");
    if (whatsappFloat) {
      whatsappFloat.href = config.links.whatsapp;
    }

  } catch (error) {
    console.error("Error initializing page:", error);
    alert("An error occurred while loading the page. Please try again.");
  }

  // Helper functions
  function updateBasicInfo(config) {
    if (config.serverName) {
      document.title = `${config.serverName} - Private Server`;
    }
    
    const heroText = document.getElementById("hero-text");
    if (heroText && config.heroText) {
      heroText.textContent = config.heroText;
    }
    
    const currentYear = document.getElementById("current-year");
    if (currentYear) {
      currentYear.textContent = new Date().getFullYear();
    }
  }

  function updateFeatures(config) {
    const featuresGrid = document.getElementById("features-grid");
    const featuresMarquee = document.getElementById("features-marquee");
    
    if (featuresGrid && Array.isArray(config.features)) {
      featuresGrid.innerHTML = config.features.map(feature => `
        <div class="bg-[#1e1e1e] p-6 rounded-lg shake-animation border border-gray-700">
          <div class="text-yellow-500 text-2xl mb-2">
            <i class="fas ${getFeatureIcon(feature)}"></i>
          </div>
          <h3 class="font-bold mb-2">${feature}</h3>
          <p class="text-sm text-white/80">${getFeatureDesc(feature, config)}</p>
        </div>
      `).join('');
    }
    
    if (featuresMarquee && Array.isArray(config.features)) {
      const featuresText = config.features.map(f => f.toUpperCase()).join(' • ');
      featuresMarquee.textContent = `${featuresText} • ${featuresText}`;
    }
  }

  function setupTutorialButtons(config) {
    const appButtonsContainer = document.getElementById('app-buttons');
    if (!appButtonsContainer) return;

    // Clear any existing buttons
    appButtonsContainer.innerHTML = '';

    // Add Windows and Surge 5 to tutorial methods if not already present
    const tutorialMethods = [
      ...config.tutorial,
      {
        name: "Windows",
        color: "#0078D7",
        instructions: [
          "1. Press Win+R (Windows Key + R)",
          "2. Type 'C:\\Windows\\System32\\drivers\\etc\\hosts'",
          "3. Open with Notepad as Administrator",
          "4. Add the server IP configurations:",
          "91.134.85.13 growtopia1.com",
          "91.134.85.13 growtopia2.com",
          "91.134.85.13 growtopiagame.com",
          "5. Save the file",
          "6. Open Growtopia and Connect!"
        ]
      },
      {
        name: "Surge 5",
        color: "#6A5ACD",
        instructions: [
          "1. Open Surge 5 application",
          "2. Go to Configuration tab",
          "3. Add these host configurations:",
          "[Host]",
          "*.growtopia1.com = 91.134.85.13",
          "*.growtopia2.com = 91.134.85.13",
          "4. Enable the configuration",
          "5. Open Growtopia and Connect!"
        ]
      }
    ];

    // Create buttons for each tutorial method with custom styling
    tutorialMethods.forEach((app) => {
      const button = document.createElement('button');
      button.className = `px-6 py-3 rounded-lg text-white font-medium shake-animation border border-gray-600`;
      button.style.backgroundColor = '#1a1a1a'; // Dark background
      button.textContent = app.name;
      
      button.addEventListener('click', () => showAppInstructions(app));
      
      appButtonsContainer.appendChild(button);
    });
  }

  function showAppInstructions(app) {
    const container = document.getElementById('app-instructions-container');
    if (!container) return;
    
    container.innerHTML = `
      <div class="app-instructions show fade-in bg-[#1a1a1a] rounded p-5 space-y-4 border border-gray-700">
        ${app.apk || app.host ? `
        <div class="mb-4 flex flex-wrap justify-center gap-2">
          ${app.apk ? `
          <a href="${app.apk}" target="_blank" class="px-4 py-2 rounded text-white text-sm font-medium shake-animation border border-gray-600"
             style="background-color: #1a1a1a">
            <i class="fas fa-download mr-1"></i> Download ${app.name || 'App'}
          </a>` : ''}
          ${app.host ? `
          <a href="${app.host}" target="_blank" class="px-4 py-2 rounded text-white text-sm font-medium shake-animation border border-gray-600"
             style="background-color: #1a1a1a">
            <i class="fas fa-file-alt mr-1"></i> Download Host File
          </a>` : ''}
        </div>` : ''}
        
        <ol class="list-decimal pl-5 space-y-2 mb-4 text-white">
          ${Array.isArray(app.instructions) ? 
            app.instructions.map(i => `<li class="shake-animation">${i}</li>`).join('') : 
            '<li>No instructions available</li>'}
        </ol>
        
        <p class="text-xs text-red-400 italic mt-4">
          NOTE: If you experience problems when logging in, please open a ticket on our Discord.
        </p>
      </div>
    `;
  }

  function updateAboutSection(config) {
    const aboutTitle = document.getElementById("about-title");
    if (aboutTitle && config.serverName) {
      aboutTitle.textContent = `About ${config.serverName}`;
    }
    
    const aboutImage = document.getElementById("about-image");
    if (aboutImage && config.about?.image) {
      aboutImage.src = config.about.image;
      aboutImage.alt = `About ${config.serverName}`;
    }
    
    const aboutCard = document.getElementById("about-card");
    if (aboutCard && config.about) {
      aboutCard.innerHTML = `
        <h3 class="text-xl font-bold mb-4 text-yellow-500">${config.about.title || 'About Us'}</h3>
        <p class="text-yellow-400 mb-3">${config.about.subtitle || ''}</p>
        ${Array.isArray(config.about.paragraphs) ? 
          config.about.paragraphs.map(p => `<p class="mb-3 text-sm">${p}</p>`).join('') : 
          '<p class="mb-3 text-sm">No description available</p>'}
        <div class="mt-4 flex items-center">
          ${config.about.icon ? `<img src="${config.about.icon}" alt="Server Icon" class="w-10 h-10 mr-3">` : ''}
          <span class="text-yellow-500">${config.serverName || ''}</span>
        </div>
      `;
    }
  }

  function updateTeamSection(config) {
    const teamSlider = document.getElementById("team-slider");
    if (teamSlider && Array.isArray(config.teams)) {
      teamSlider.innerHTML = `
        <div class="inline-flex space-x-8 px-4">
          ${config.teams.map(member => `
            <div class="bg-[#1e1e1e] p-4 rounded-lg text-center inline-block w-64 shake-animation border border-gray-700">
              ${member.image ? `<img src="${member.image}" alt="${member.name || 'Team member'}" class="w-20 h-20 rounded-full mx-auto mb-3">` : ''}
              <h3 class="font-bold text-yellow-500">${member.name || 'Team Member'}</h3>
              <p class="text-sm text-white/80">${member.role || ''}</p>
              ${member.social ? `<p class="text-xs text-yellow-400 mt-1">${member.social}</p>` : ''}
            </div>
          `).join('')}
        </div>
      `;
      teamSlider.style.animationDuration = `${config.teams.length * 4}s`;
    }
  }

  function updateTestimonials(config) {
    const testimonialSlider = document.getElementById("testimonial-slider");
    if (!testimonialSlider || !Array.isArray(config.testimonial)) return;
    
    testimonialSlider.innerHTML = `
      <div class="inline-flex w-full">
        ${config.testimonial.map((testi, index) => `
          <div class="testimonial-item" style="width: ${100 / config.testimonial.length}%">
            <div class="bg-[#1e1e1e] p-6 rounded-lg text-center mx-auto max-w-md border border-gray-700">
              <p class="italic mb-4">"${testi.quote || 'No testimonial text available'}"</p>
              <div class="flex justify-center items-center">
                ${Array(5).fill().map((_, i) => `
                  <i class="fas fa-star ${i < (testi.rating || 0) ? 'text-yellow-500' : 'text-gray-500'}"></i>
                `).join('')}
              </div>
              <p class="text-yellow-500 font-bold mt-2">- ${testi.name || 'Anonymous'}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    testimonialSlider.style.animationDuration = `${config.testimonial.length * 5}s`;
  }

  function updateCommunityLinks(config) {
    const communityLinks = document.getElementById("community-links");
    if (!communityLinks || !config.links) return;
    
    communityLinks.innerHTML = `
      ${config.links.discord ? `
        <a href="${config.links.discord}" class="bg-[#1a1a1a] hover:bg-[#2a2a2a] px-6 py-3 rounded-lg text-white inline-flex items-center transition shake-animation border border-gray-600">
          <i class="fab fa-discord mr-2"></i> Discord
        </a>
      ` : ''}
      ${config.links.whatsapp ? `
        <a href="${config.links.whatsapp}" class="bg-[#1a1a1a] hover:bg-[#2a2a2a] px-6 py-3 rounded-lg text-white inline-flex items-center transition shake-animation border border-gray-600">
          <i class="fab fa-whatsapp mr-2"></i> WhatsApp
        </a>
      ` : ''}
      ${config.links.tiktok ? `
        <a href="${config.links.tiktok}" class="bg-[#1a1a1a] hover:bg-[#2a2a2a] px-6 py-3 rounded-lg text-white inline-flex items-center transition shake-animation border border-gray-600">
          <i class="fab fa-tiktok mr-2"></i> TikTok
        </a>
      ` : ''}
      ${config.links.youtube ? `
        <a href="${config.links.youtube}" class="bg-[#1a1a1a] hover:bg-[#2a2a2a] px-6 py-3 rounded-lg text-white inline-flex items-center transition shake-animation border border-gray-600">
          <i class="fab fa-youtube mr-2"></i> YouTube
        </a>
      ` : ''}
    `;
  }

  function getFeatureIcon(feature) {
    if (!feature) return 'fa-star';
    
    const icons = {
      'Delivery': 'fa-bolt',
      'Team': 'fa-users',
      'Online': 'fa-clock',
      'Ban': 'fa-shield-alt',
      'Price': 'fa-tag',
      'Community': 'fa-comments',
      'Giveaway': 'fa-gift',
      'Legal': 'fa-balance-scale',
      'Moderator': 'fa-user-shield'
    };
    
    return Object.entries(icons).find(([key]) => 
      feature.toString().includes(key)
    )?.[1] || 'fa-star';
  }

  function getFeatureDesc(feature, config) {
    if (!feature) return 'Premium feature';
    
    const descs = {
      'Delivery': 'Instant item delivery system',
      'Team': 'Professional development team',
      'Online': '24/7 server availability',
      'Ban': 'Advanced anti-ban protection',
      'Price': 'Most affordable prices',
      'Giveaway': 'Always Giveaway Everyday',
      'Legal': 'Can Sell All Item In Game (Legal)',
      'Community': config.serverStatus?.players ? 
        `${config.serverStatus.players.toLocaleString()}+ active players` : 
        'Active player community',
      'Moderator': 'Free moderator roles available'
    };
    
    return Object.entries(descs).find(([key]) => 
      feature.toString().includes(key)
    )?.[1] || 'Premium feature';
  }
});
