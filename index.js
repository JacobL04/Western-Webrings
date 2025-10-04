// fetch("https://raw.githubusercontent.com/JacobL04/Western-Webrings/refs/heads/main/webring.json")
fetch("webring.json")
    .then(response => response.json())
    .then(data => {
    const container = document.getElementById("profiles");
    const counter = document.getElementById("counter");
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");
    
    prev.href = data[data.length - 1].url;
    next.href = data[0].url;

    console.log("total of " + data.length + " profiles found")
    counter.textContent = data.length;

    data.forEach(profile => {
        const div = document.createElement("div");
        div.classList.add("profile-card");

        // Set background (either color or image)
        if (profile.background.startsWith("http")) {
            // It's an image URL
            div.style.setProperty('--background-image', `url(${profile.background})`);
        } 
        else if (profile.background.startsWith("#")) {
            div.style.backgroundColor = profile.background
        }
        else {
            div.style.backgroundColor = "#f9f9f9";
        }

        // Apply custom text color if specified
        div.style.color = profile.textColor || "#000";

        div.innerHTML = `
            <h2 style="font-family: ${profile.fontFamily || 'BentonSans Regular'}, sans-serif; color: ${profile.nameColor || 'black'};">${profile.name}</h2>
            <div class="meta">
                <span class="program" style="color: ${profile.programColor || 'black'};">${profile.program}</span>
                <span class="separator">|</span>
                <span class="grad-year" style="color: ${profile.gradYearColor || '#666'};">Class of ${profile.graduating_year}</span>
            </div>
            <p class="description" style="color: ${profile.descriptionColor || '#818284'};">${profile.description}</p>
            <a href="${profile.url}" target="_blank" style="color: ${profile.urlColor || '#007bff'};">${profile.urlText || "Visit my website"}</a>
        `;

        container.appendChild(div);
    });
    })
    .catch(error => {
        console.error("Error loading JSON:", error);
        document.getElementById("profiles").innerHTML = `<p>Failed to load profiles.</p>`;
});



// Live Preview Customization Tool
document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("name");
  const urlInput = document.getElementById("url");
  const programInput = document.getElementById("program");
  const urlTextInput = document.getElementById("urlText");
  const backgroundColorInput = document.getElementById("backgroundColor");
  const backgroundImageUrlInput = document.getElementById("backgroundImageUrl");
  const fontFamilyInput = document.getElementById("fontFamily");
  const nameColorInput = document.getElementById("nameColor");
  const programColorInput = document.getElementById("programColor");
  const descriptionInput = document.getElementById("description");
  const graduatingYearInput = document.getElementById("graduatingYear");

  // New Color Inputs
  const urlColorInput = document.getElementById("urlColor");
  const descriptionColorInput = document.getElementById("descriptionColor");
  const gradYearColorInput = document.getElementById("gradYearColor");

  const previewName = document.getElementById("previewName");
  const previewProgram = document.getElementById("previewProgram");
  const previewGradYear = document.getElementById("previewGradYear");
  const previewDescription = document.getElementById("previewDescription");
  const previewUrl = document.getElementById("previewUrl");

  const generateJSON = document.getElementById("generateJSON");
  const jsonOutput = document.getElementById("jsonOutput");

  // Presets container
  const presetsContainer = document.getElementById('presetsContainer');
  const presetsSelect = document.getElementById('presetsSelect');
  const applyPresetBtn = document.getElementById('applyPresetBtn');
  const resetDefaultBtn = document.getElementById('resetDefaultBtn');

  // Switch between color and image input
  const backgroundColorOption = document.getElementById("backgroundColorOption");
  const backgroundImageOption = document.getElementById("backgroundImageOption");

  backgroundColorOption.addEventListener("change", toggleBackgroundInput);
  backgroundImageOption.addEventListener("change", toggleBackgroundInput);

  // Initially hide the input fields for background color and image
  function toggleBackgroundInput() {
    if (backgroundColorOption.checked) {
      backgroundColorInput.style.display = "inline-block";
      backgroundImageUrlInput.style.display = "none";
    } else if (backgroundImageOption.checked) {
      backgroundColorInput.style.display = "none";
      backgroundImageUrlInput.style.display = "inline-block";
    }
    updatePreview(); // To update preview after toggle
  }


  // Helper: escape text inserted into innerHTML to avoid accidental markup injection
  function escapeHtml(str) {
    if (str == null) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function updatePreview() {
    const previewRoot = document.getElementById("profileCardPreview");

    const profile = {
      name: nameInput.value || "Enter Your Name",
      url: urlInput.value || "#",
      urlText: urlTextInput.value || "Visit my website",
      graduating_year: graduatingYearInput.value || "202x",
      program: programInput.value || "Program",
      description: descriptionInput.value || "Short description of your website",
      background: backgroundColorOption.checked ? (backgroundColorInput.value || "#f9f9f9") : (backgroundImageUrlInput.value || ""),
      nameColor: nameColorInput.value || "black",
      programColor: programColorInput.value || "black",
      gradYearColor: gradYearColorInput.value || "#666",
      descriptionColor: descriptionColorInput.value || "#818284",
      urlColor: urlColorInput.value || "#007bff",
      fontFamily: fontFamilyInput.value || "BentonSans Regular",
    };

    const card = document.createElement("div");
    card.classList.add("profile-card");

    // Background handling: image URL vs color
    if (typeof profile.background === "string" && profile.background.startsWith("http")) {
      
      
      card.style.setProperty('--background-image', `url(${profile.background})`);
      
      card.style.backgroundImage = `url(${profile.background})`;
      card.style.backgroundColor = "";
    }
    else if (typeof profile.background === "string" && profile.background.startsWith("#")) {
      card.style.backgroundImage = "";
      card.style.backgroundColor = profile.background;
    }
    else {
      card.style.backgroundImage = "";
      card.style.backgroundColor = "#f9f9f9";
    }

    card.style.fontFamily = profile.fontFamily;
    card.style.color = "";

    card.innerHTML = `
            <h2 style="font-family: ${escapeHtml(profile.fontFamily)}, sans-serif; color: ${escapeHtml(profile.nameColor)};">${escapeHtml(profile.name)}</h2>
            <div class="meta">
                <span class="program" style="color: ${escapeHtml(profile.programColor)};">${escapeHtml(profile.program)}</span>
                <span class="separator">|</span>
                <span class="grad-year" style="color: ${escapeHtml(profile.gradYearColor)};">Class of ${escapeHtml(profile.graduating_year)}</span>
            </div>
            <p class="description" style="color: ${escapeHtml(profile.descriptionColor)};">${escapeHtml(profile.description)}</p>
            <a id="previewAnchor" href="${escapeHtml(profile.url)}" target="_blank" style="color: ${escapeHtml(profile.urlColor)};">${escapeHtml(profile.urlText)}</a>
        `;

    previewRoot.innerHTML = "";
    previewRoot.appendChild(card);
  }


  // Premade profile cards
  const presets = [
    {
      title: 'Simple — White',
      name: 'Your Name',
      program: 'Program',
      graduating_year: '2025',
      description: 'A short blurb about the site.',
      background: '#ffffff',
      nameColor: '#111',
      programColor: '#333',
      gradYearColor: '#666',
      descriptionColor: '#666',
      urlColor: '#007bff',
      urlText: 'Visit my site',
      url: '#',
      fontFamily: 'BentonSans Regular'
    },
    {
      title: 'GIF — Banner',
      name: 'Shapes',
      program: 'Community',
      graduating_year: '—',
      description: 'A cozy collection of western themed sites.',
      background: 'https://i.pinimg.com/originals/c8/d0/9b/c8d09ba97b3cfd0dd9334e3fac7925e3.gif',
      nameColor: '#fff',
      programColor: '#fff',
      gradYearColor: '#f0f0f0',
      descriptionColor: '#f5e8ff',
      urlColor: '#ffe6ff',
      urlText: 'Explore',
      url: '#',
      fontFamily: 'BentonSans Regular'
    },
    {
      title: 'Muted — Card',
      name: 'Simple Card',
      program: 'Blog',
      graduating_year: '202x',
      description: 'Minimal and legible.',
      background: '#f2f2f2',
      nameColor: '#2c2c2c',
      programColor: '#4f2683',
      gradYearColor: '#666',
      descriptionColor: '#818284',
      urlColor: '#4F2683',
      urlText: 'Read more',
      url: '#',
      fontFamily: 'Arial'
    }
  ];

  // Default profile values (used for reset)
  const defaultProfile = {
    name: "Enter Your Name",
    url: "#",
    urlText: "Visit my website",
    graduating_year: "202x",
    program: "Program",
    description: "Short description of your website",
    background: "#f9f9f9",
    nameColor: "#000000",
    programColor: "#000000",
    gradYearColor: "#666666",
    descriptionColor: "#818284",
    urlColor: "#007bff",
    fontFamily: "BentonSans Regular"
  };

  // Populate presets select
  if (presetsSelect) {
    presets.forEach((p, idx) => {
      const opt = document.createElement('option');
      opt.value = String(idx);
      opt.textContent = p.title;
      presetsSelect.appendChild(opt);
    });
  }

  // Apply selected preset from dropdown
  if (applyPresetBtn && presetsSelect) {
    applyPresetBtn.addEventListener('click', () => {
      const idx = presetsSelect.value;
      if (idx === "") return;
      const preset = presets[Number(idx)];
      applyPreset(preset);
    });
  }

  // Reset to default values
  if (resetDefaultBtn) {
    resetDefaultBtn.addEventListener('click', () => {
      // apply default values to inputs
      nameInput.value = defaultProfile.name;
      urlInput.value = defaultProfile.url;
      urlTextInput.value = defaultProfile.urlText;
      graduatingYearInput.value = defaultProfile.graduating_year;
      programInput.value = defaultProfile.program;
      descriptionInput.value = defaultProfile.description;
      fontFamilyInput.value = defaultProfile.fontFamily;
      // background as color
      backgroundColorOption.checked = true;
      toggleBackgroundInput();
      backgroundColorInput.value = defaultProfile.background;
      nameColorInput.value = defaultProfile.nameColor;
      programColorInput.value = defaultProfile.programColor;
      descriptionColorInput.value = defaultProfile.descriptionColor;
      urlColorInput.value = defaultProfile.urlColor;
      gradYearColorInput.value = defaultProfile.gradYearColor;

      // Clear presets select
      if (presetsSelect) presetsSelect.value = "";

      updatePreview();
    });
  }

  function applyPreset(preset) {
    // Apply preset fields to inputs (only those that exist)
    if (!preset) return;
    nameInput.value = preset.name || '';
    programInput.value = preset.program || '';
    graduatingYearInput.value = preset.graduating_year || '';
    descriptionInput.value = preset.description || '';
    urlInput.value = preset.url || '';
    urlTextInput.value = preset.urlText || '';
    fontFamilyInput.value = preset.fontFamily || '';
    // Determine background type: if starts with '#' treat as color, else treat as image
    if (preset.background && preset.background.startsWith('#')) {
      backgroundColorOption.checked = true;
      toggleBackgroundInput();
      backgroundColorInput.value = preset.background;
    } else {
      backgroundImageOption.checked = true;
      toggleBackgroundInput();
      backgroundImageUrlInput.value = preset.background || '';
    }
    // Colors
    nameColorInput.value = preset.nameColor || '#000000';
    programColorInput.value = preset.programColor || '#000000';
    descriptionColorInput.value = preset.descriptionColor || '#818284';
    urlColorInput.value = preset.urlColor || '#007bff';
    gradYearColorInput.value = preset.gradYearColor || '#666';

    updatePreview();
  }

  // Render preset buttons if a container exists
  if (presetsContainer) {
    presets.forEach(p => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'preset-btn';
      btn.textContent = p.title;
      btn.addEventListener('click', () => applyPreset(p));
      presetsContainer.appendChild(btn);
    });
  }

  // Generate JSON
  generateJSON.addEventListener("click", () => {
    const profileData = {
      name: nameInput.value || "Enter Your Name", // Default value
      url: urlInput.value || "#", // Default value
      urlText: urlTextInput.value || "☆｡･ﾟ✧ My Website ✧･｡☆", // Default URL title
      graduating_year: graduatingYearInput.value || "202x", // Default value
      program: programInput.value || "Program", // Default program
      description: descriptionInput.value || "Short description of your website", // Default description
      background: backgroundColorOption.checked ? backgroundColorInput.value : backgroundImageUrlInput.value, // Either color or image
      nameColor: nameColorInput.value || "#000000", // Default name color
      programColor: programColorInput.value || "#000000", // Default program color
      gradYearColor: gradYearColorInput.value || "#666", // Default graduating year color
      descriptionColor: descriptionColorInput.value || "#818284", // Default description color
      urlColor: urlColorInput.value || "#007bff", // Default URL color
      fontFamily: fontFamilyInput.value || "BentonSans", // Default font
    };

    // Output JSON
    jsonOutput.textContent = JSON.stringify(profileData, null, 2);
  });

  // Event Listeners for inputs
  nameInput.addEventListener("input", updatePreview);
  urlInput.addEventListener("input", updatePreview);
  programInput.addEventListener("input", updatePreview);
  urlTextInput.addEventListener("input", updatePreview);
  backgroundColorInput.addEventListener("input", updatePreview);
  backgroundImageUrlInput.addEventListener("input", updatePreview);
  fontFamilyInput.addEventListener("change", updatePreview);
  nameColorInput.addEventListener("input", updatePreview);
  programColorInput.addEventListener("input", updatePreview);
  descriptionInput.addEventListener("input", updatePreview);
  graduatingYearInput.addEventListener("input", updatePreview);

  // Event Listeners for Color Inputs
  urlColorInput.addEventListener("input", updatePreview);
  descriptionColorInput.addEventListener("input", updatePreview);
  gradYearColorInput.addEventListener("input", updatePreview);

  toggleBackgroundInput();
  updatePreview();
});


// document.addEventListener("DOMContentLoaded", () => {
//   const nameInput = document.getElementById("name");
//   const urlInput = document.getElementById("url");
//   const programInput = document.getElementById("program");
//   const urlTextInput = document.getElementById("urlText");
//   const backgroundInput = document.getElementById("background");
//   const fontFamilyInput = document.getElementById("fontFamily");
//   const nameColorInput = document.getElementById("nameColor");
//   const programColorInput = document.getElementById("programColor");
//   const descriptionInput = document.getElementById("description");
//   const graduatingYearInput = document.getElementById("graduatingYear");

//   // New Color Inputs
//   const urlColorInput = document.getElementById("urlColor");
//   const descriptionColorInput = document.getElementById("descriptionColor");
//   const gradYearColorInput = document.getElementById("gradYearColor");

//   const previewName = document.getElementById("previewName");
//   const previewProgram = document.getElementById("previewProgram");
//   const previewGradYear = document.getElementById("previewGradYear");
//   const previewDescription = document.getElementById("previewDescription");
//   const previewUrl = document.getElementById("previewUrl");

//   const generateJSONBtn = document.getElementById("generateJSONBtn");
//   const jsonOutput = document.getElementById("jsonOutput");

//   // Update Preview
//   function updatePreview() {
//     // Name
//     previewName.textContent = nameInput.value || "Enter Your Name";

//     // URL
//     previewUrl.href = urlInput.value || "#";
//     previewUrl.textContent = urlInput.value ? (urlTextInput.value || "Visit my website") : "";  // Default URL Title

//     // Program
//     previewProgram.textContent = programInput.value || "Program";

//     // Graduating Year
//     previewGradYear.textContent = `Class of ${graduatingYearInput.value || "202x"}`;

//     // Description
//     previewDescription.textContent = descriptionInput.value || "Short description of your website";

//     // Background and Font
//     const backgroundValue = backgroundInput.value;
//     if (backgroundValue.startsWith("http")) {
//       document.getElementById("profileCardPreview").style.backgroundImage = `url(${backgroundValue})`;
//     } else if (backgroundValue.startsWith("#")) {
//       document.getElementById("profileCardPreview").style.backgroundColor = backgroundValue;
//     } else {
//       document.getElementById("profileCardPreview").style.background = "#f9f9f9";
//     }

//     // Font Family
//     document.getElementById("profileCardPreview").style.fontFamily = fontFamilyInput.value;

//     // Text Colors
//     previewName.style.color = nameColorInput.value;
//     previewProgram.style.color = programColorInput.value;
//     previewGradYear.style.color = gradYearColorInput.value || "#666"; // Default to gray if no color is selected
//     previewDescription.style.color = descriptionColorInput.value || "#818284"; // Default description color
//     previewUrl.style.color = urlColorInput.value || "#007bff"; // Default URL color
//   }

//   // Generate JSON
//   generateJSONBtn.addEventListener("click", () => {
//     const profileData = {
//       name: nameInput.value || "Enter Your Name", // Default value
//       url: urlInput.value || "#", // Default value
//       urlText: urlTextInput.value || "☆｡･ﾟ✧ My Website ✧･｡☆", // Default URL title
//       graduating_year: graduatingYearInput.value || "202x", // Default value
//       program: programInput.value || "Program", // Default program
//       description: descriptionInput.value || "Short description of your website", // Default description
//       background: backgroundInput.value || "#f9f9f9", // Default background color
//       nameColor: nameColorInput.value || "#000000", // Default name color
//       programColor: programColorInput.value || "#000000", // Default program color
//       gradYearColor: gradYearColorInput.value || "#666", // Default graduating year color
//       descriptionColor: descriptionColorInput.value || "#818284", // Default description color
//       urlColor: urlColorInput.value || "#007bff", // Default URL color
//       fontFamily: fontFamilyInput.value || "BentonSans", // Default font
//     };

//     // Output JSON
//     jsonOutput.textContent = JSON.stringify(profileData, null, 2);
//   });

//   // Event Listeners for inputs
//   nameInput.addEventListener("input", updatePreview);
//   urlInput.addEventListener("input", updatePreview);
//   programInput.addEventListener("input", updatePreview);
//   urlTextInput.addEventListener("input", updatePreview);
//   backgroundInput.addEventListener("input", updatePreview);
//   fontFamilyInput.addEventListener("change", updatePreview);
//   nameColorInput.addEventListener("input", updatePreview);
//   programColorInput.addEventListener("input", updatePreview);
//   descriptionInput.addEventListener("input", updatePreview);
//   graduatingYearInput.addEventListener("input", updatePreview);

//   // New Event Listeners for Color Inputs
//   urlColorInput.addEventListener("input", updatePreview);
//   descriptionColorInput.addEventListener("input", updatePreview);
//   gradYearColorInput.addEventListener("input", updatePreview);

//   // Initial Update
//   updatePreview();
// });

