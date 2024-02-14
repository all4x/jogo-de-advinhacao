#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use rand::Rng;
use std::cmp::Ordering;

static mut NUMBER_SECRET: Option<i32> = None;
static mut NUMBER_GENERATED: bool = false;

#[tauri::command]
fn greet(palpite: &str) -> String {
    let number: i32 = palpite.parse().expect("Erro ao converter palpite");

    unsafe {
        if !NUMBER_GENERATED {
            NUMBER_SECRET = Some(rand::thread_rng().gen_range(0..=100));
            NUMBER_GENERATED = true;
        }

        let result = match (NUMBER_SECRET, number.cmp(&NUMBER_SECRET.unwrap())) {
            (Some(secret), Ordering::Less) if number < secret => "Muito baixo!",
            (Some(secret), Ordering::Greater) if number > secret => "Muito alto!",
            (Some(_), Ordering::Equal) => {
                NUMBER_GENERATED = false; // Reinicia o jogo
                "Acertou!"
            }
            _ => "Número inválido",
        };

        format!("{result}")
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
