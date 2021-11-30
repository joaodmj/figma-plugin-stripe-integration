figma.showUI(__html__, { width: 330, height: 300 });

figma.ui.onmessage = async (msg) => {
    console.log("msg", msg);
  
}