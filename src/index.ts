document.getElementById('file1')?.addEventListener('change', handleFileSelect);
document.getElementById('file2')?.addEventListener('change', handleFileSelect);

function handleFileSelect(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      console.log(content);
      // Add your file handling logic here
    };
    reader.readAsText(file);
  }
}