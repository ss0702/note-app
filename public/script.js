document.getElementById('search').addEventListener('input', searchNotes);

let notes = JSON.parse(localStorage.getItem('notes')) || [];

function showNotes() {
  const content = document.getElementById('content');
  content.innerHTML = '';
  notes.forEach(note => {
    if (!note.archived && !note.trashed) {
      const noteElement = document.createElement('div');
      noteElement.className = 'note';
      noteElement.style.backgroundColor = note.backgroundColor || '#fff';
      noteElement.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <div class="tags">${note.tags.join(', ')}</div>
      `;
      content.appendChild(noteElement);
    }
  });
}

function showArchivedNotes() {
  const content = document.getElementById('content');
  content.innerHTML = '';
  notes.forEach(note => {
    if (note.archived && !note.trashed) {
      const noteElement = document.createElement('div');
      noteElement.className = 'note';
      noteElement.style.backgroundColor = note.backgroundColor || '#fff';
      noteElement.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <div class="tags">${note.tags.join(', ')}</div>
      `;
      content.appendChild(noteElement);
    }
  });
}

function showTrashedNotes() {
  const content = document.getElementById('content');
  content.innerHTML = '';
  notes.forEach(note => {
    if (note.trashed) {
      const noteElement = document.createElement('div');
      noteElement.className = 'note';
      noteElement.style.backgroundColor = note.backgroundColor || '#fff';
      noteElement.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <div class="tags">${note.tags.join(', ')}</div>
      `;
      content.appendChild(noteElement);
    }
  });
}

function showLabels() {
  const labels = new Set();
  notes.forEach(note => {
    note.tags.forEach(tag => labels.add(tag));
  });

  const content = document.getElementById('content');
  content.innerHTML = '';
  labels.forEach(label => {
    const labelElement = document.createElement('div');
    labelElement.className = 'label';
    labelElement.innerHTML = `<h3>${label}</h3>`;
    content.appendChild(labelElement);

    notes.forEach(note => {
      if (note.tags.includes(label) && !note.archived && !note.trashed) {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.style.backgroundColor = note.backgroundColor || '#fff';
        noteElement.innerHTML = `
          <h3>${note.title}</h3>
          <p>${note.content}</p>
          <div class="tags">${note.tags.join(', ')}</div>
        `;
        content.appendChild(noteElement);
      }
    });
  });
}

function searchNotes() {
  const query = document.getElementById('search').value.toLowerCase();
  const notesElements = document.querySelectorAll('.note');
  notesElements.forEach(noteElement => {
    const title = noteElement.querySelector('h3').textContent.toLowerCase();
    const content = noteElement.querySelector('p').textContent.toLowerCase();
    if (title.includes(query) || content.includes(query)) {
      noteElement.style.display = 'block';
    } else {
      noteElement.style.display = 'none';
    }
  });
}

function showCreateNote() {
  document.getElementById('note-modal').style.display = 'block';
}

function closeCreateNote() {
  document.getElementById('note-modal').style.display = 'none';
}

function createNote() {
  const title = document.getElementById('note-title').value;
  const content = document.getElementById('note-content').value;
  const tags = document.getElementById('note-tags').value.split(',').map(tag => tag.trim());

  const newNote = {
    title,
    content,
    tags,
    archived: false,
    trashed: false,
    backgroundColor: '#fff',
  };

  notes.push(newNote);
  localStorage.setItem('notes', JSON.stringify(notes));
  closeCreateNote();
  showNotes();
}

// Initialize
showNotes();
